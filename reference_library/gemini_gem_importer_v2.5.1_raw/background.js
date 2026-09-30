/* global GemImporterShared */
"use strict";

importScripts("shared.js");

const { TASK_KEY, GEM_MANAGER_URL } = GemImporterShared;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "START_IMPORT") {
    startImport(message.task)
      .then((result) => sendResponse({ ok: true, ...result }))
      .catch((error) => sendResponse({ ok: false, error: error.message }));
    return true;
  }

  if (message?.type === "CONTROL_IMPORT") {
    controlImport(message.command)
      .then(() => sendResponse({ ok: true }))
      .catch((error) => sendResponse({ ok: false, error: error.message }));
    return true;
  }

  if (message?.type === "WHO_AM_I") {
    sendResponse({ tabId: sender.tab?.id ?? null });
    return;
  }

  if (message?.type === "NAVIGATE_MANAGER") {
    sendResponse({ ok: true });
    navigateTaskToManager(message.taskId, sender.tab?.id).catch(async (error) => {
      const task = await getTask();
      if (task?.id !== message.taskId) return;
      task.status = "error";
      task.error = `自动进入 Gem 管理器失败：${error.message}`;
      task.updatedAt = Date.now();
      await chrome.storage.local.set({ [TASK_KEY]: task });
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete" || !tab.url?.startsWith("https://gemini.google.com/")) return;
  resumeRunningTaskFromGemini(tabId, tab.url).catch(() => {});
});

chrome.tabs.onRemoved.addListener((tabId) => {
  clearClosedTargetTab(tabId).catch(() => {});
});

async function startImport(task) {
  if (!task || !Array.isArray(task.items) || task.items.length === 0) {
    throw new Error("没有可导入的 TXT 文件");
  }
  const existingTask = await getTask();
  if (existingTask?.id && existingTask.id !== task.id) await removeStoredItems(existingTask);

  const normalizedTask = {
    id: task.id,
    createdAt: task.createdAt,
    updatedAt: Date.now(),
    status: "queued",
    currentIndex: task.currentIndex || 0,
    completed: task.completed || 0,
    skipped: task.skipped || 0,
    failed: 0,
    currentName: "",
    error: "",
    log: existingTask?.id === task.id ? existingTask.log || [] : [],
    options: task.options,
    items: task.items,
    targetTabId: null,
    navigationAttempts: 0
  };

  await chrome.storage.local.set({ [TASK_KEY]: normalizedTask });
  const tab = await getOrCreateGeminiTab();
  normalizedTask.targetTabId = tab.id;
  normalizedTask.status = "running";
  normalizedTask.updatedAt = Date.now();
  await chrome.storage.local.set({ [TASK_KEY]: normalizedTask });

  await ensureContentScript(tab.id);
  await chrome.tabs.sendMessage(tab.id, { type: "RUN_IMPORT", taskId: task.id });
  return { tabId: tab.id };
}

async function navigateTaskToManager(taskId, tabId) {
  const task = await getTask();
  if (!task || task.id !== taskId) throw new Error("导入任务已失效");
  if (!tabId) throw new Error("找不到当前 Gemini 标签页");

  task.targetTabId = tabId;
  task.status = "running";
  task.updatedAt = Date.now();
  await chrome.storage.local.set({ [TASK_KEY]: task });

  await chrome.tabs.update(tabId, { url: GEM_MANAGER_URL, active: true });
  await waitForTabComplete(tabId, 45000);
  await ensureContentScript(tabId);
  await chrome.tabs.sendMessage(tabId, { type: "RUN_IMPORT", taskId });
}

async function resumeRunningTaskFromGemini(tabId, url) {
  const task = await getTask();
  if (!task || task.status !== "running") return;
  if (task.targetTabId && task.targetTabId !== tabId) return;

  const pathname = new URL(url).pathname;
  if (pathname !== "/" && pathname !== "/app" && !pathname.startsWith("/gems/view")) return;

  task.targetTabId = tabId;
  task.updatedAt = Date.now();
  await chrome.storage.local.set({ [TASK_KEY]: task });

  await ensureContentScript(tabId);
  await chrome.tabs.sendMessage(tabId, { type: "RUN_IMPORT", taskId: task.id });
}

async function clearClosedTargetTab(tabId) {
  const task = await getTask();
  if (!task || task.targetTabId !== tabId || task.status !== "running") return;
  task.targetTabId = null;
  task.updatedAt = Date.now();
  await chrome.storage.local.set({ [TASK_KEY]: task });
}

async function removeStoredItems(task) {
  const keys = (task.items || []).map((item) => item.storageKey).filter(Boolean);
  for (let offset = 0; offset < keys.length; offset += 500) {
    await chrome.storage.local.remove(keys.slice(offset, offset + 500));
  }
}

async function controlImport(command) {
  const task = await getTask();
  if (!task) throw new Error("没有可控制的导入任务");

  if (command === "resume") {
    task.status = "running";
    task.error = "";
    task.updatedAt = Date.now();
    await chrome.storage.local.set({ [TASK_KEY]: task });
    const tab = await getOrCreateGeminiTab(task.targetTabId);
    task.targetTabId = tab.id;
    await chrome.storage.local.set({ [TASK_KEY]: task });
    await ensureContentScript(tab.id);
    await chrome.tabs.sendMessage(tab.id, { type: "RUN_IMPORT", taskId: task.id });
    return;
  }

  task.status = command === "cancel" ? "cancelled" : "paused";
  task.updatedAt = Date.now();
  await chrome.storage.local.set({ [TASK_KEY]: task });
  if (task.targetTabId) {
    try {
      await chrome.tabs.sendMessage(task.targetTabId, {
        type: command === "cancel" ? "CANCEL_IMPORT" : "PAUSE_IMPORT"
      });
    } catch (_) {
      // The tab may be navigating; storage remains the source of truth.
    }
  }
}

async function getOrCreateGeminiTab(preferredTabId) {
  let tab = null;
  if (preferredTabId) {
    try {
      tab = await chrome.tabs.get(preferredTabId);
    } catch (_) {
      tab = null;
    }
  }

  if (!tab) {
    const tabs = await chrome.tabs.query({ url: "https://gemini.google.com/*" });
    tab = tabs.find((candidate) => candidate.active) || tabs[0] || null;
  }

  if (!tab) {
    tab = await chrome.tabs.create({ url: GEM_MANAGER_URL, active: true });
  } else {
    tab = await chrome.tabs.update(tab.id, { url: GEM_MANAGER_URL, active: true });
  }

  await waitForTabComplete(tab.id, 45000);
  return chrome.tabs.get(tab.id);
}

async function waitForTabComplete(tabId, timeoutMs) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const tab = await chrome.tabs.get(tabId);
    if (tab.status === "complete") return;
    await delay(300);
  }
  throw new Error("Gemini 页面加载超时，请检查网络后重试");
}

async function ensureContentScript(tabId) {
  try {
    await chrome.tabs.sendMessage(tabId, { type: "PING_IMPORTER" });
  } catch (_) {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["shared.js", "content.js"]
    });
  }
}

async function getTask() {
  const data = await chrome.storage.local.get(TASK_KEY);
  return data[TASK_KEY] || null;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
