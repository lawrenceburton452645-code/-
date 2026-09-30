/* global GemImporterShared */
"use strict";

if (!globalThis.__gemBatchImporterLoaded) {
  globalThis.__gemBatchImporterLoaded = true;
  globalThis.__gemBatchImporterRunning = false;
  globalThis.__gemBatchImporterCommand = "run";

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === "PING_IMPORTER") {
      sendResponse({ ok: true });
      return;
    }
    if (message?.type === "PAUSE_IMPORT") {
      globalThis.__gemBatchImporterCommand = "pause";
      sendResponse({ ok: true });
      return;
    }
    if (message?.type === "CANCEL_IMPORT") {
      globalThis.__gemBatchImporterCommand = "cancel";
      sendResponse({ ok: true });
      return;
    }
    if (message?.type === "RUN_IMPORT") {
      globalThis.__gemBatchImporterCommand = "run";
      runImport(message.taskId).catch(() => {});
      sendResponse({ ok: true });
    }
  });
}

async function runImport(taskId) {
  if (globalThis.__gemBatchImporterRunning) return;
  globalThis.__gemBatchImporterRunning = true;

  try {
    let task = await getTask();
    if (!task || task.id !== taskId) throw new Error("导入任务已失效，请重新选择文件");
    if (!Array.isArray(task.items) || task.items.length === 0) {
      throw new Error("队列中没有 TXT 文件，请重新选择 Skill 文本");
    }
    await updateTask({ status: "running", error: "" });
    showToast("Gem 批量导入", `准备处理 ${task.items.length} 个 TXT`);

    for (let index = task.currentIndex; index < task.items.length; index += 1) {
      await checkpoint();
      task = await getTask();
      const item = await loadTaskItem(task.items[index]);
      await updateTask({ currentIndex: index, currentName: item.gemName, error: "" });
      await addLog(`开始：${item.gemName}`);
      showToast(`正在导入 ${index + 1}/${task.items.length}`, item.gemName);

      await ensureManagerPage();
      if (task.options.skipExisting && findExistingGemByName(item.gemName)) {
        await updateTask({
          currentIndex: index + 1,
          skipped: (task.skipped || 0) + 1,
          currentName: item.gemName
        });
        await addLog(`跳过同名：${item.gemName}`);
        await chrome.storage.local.remove(item.storageKey);
        await delay(task.options.itemDelayMs || 2000);
        continue;
      }

      await createOneGem(item);
      task = await getTask();
      await updateTask({
        currentIndex: index + 1,
        completed: (task.completed || 0) + 1,
        currentName: item.gemName,
        navigationAttempts: 0
      });
      await addLog(`完成：${item.gemName}`);
      await chrome.storage.local.remove(item.storageKey);
      await returnToGemManager(item.gemName);
      await delay(task.options.itemDelayMs || 2000);
    }

    await updateTask({ status: "completed", currentName: "全部处理完成", error: "" });
    showToast("导入完成", "所有 TXT 已处理", "done");
  } catch (error) {
    if (error.name === "ImportPausedError") {
      await updateTask({ status: "paused", error: "" });
      showToast("导入已暂停", "可从扩展面板继续");
    } else if (error.name === "ImportCancelledError") {
      await updateTask({ status: "cancelled", error: "" });
      showToast("导入已取消", "已保留当前进度");
    } else if (error.name === "ImportNavigationRestartError") {
      await addLog("正在自动进入 Gem 管理器，页面加载后会继续当前项");
    } else {
      await updateTask({ status: "error", error: error.message, failed: 1 });
      await addLog(`错误：${error.message}`);
      showToast("导入中断", error.message, "error");
    }
  } finally {
    globalThis.__gemBatchImporterRunning = false;
  }
}

async function loadTaskItem(metadata) {
  if (!metadata?.storageKey) throw new Error("任务数据缺少本地存储索引");
  const data = await chrome.storage.local.get(metadata.storageKey);
  const payload = data[metadata.storageKey];
  if (!payload || typeof payload.text !== "string") {
    throw new Error(`找不到 Skill 正文：${metadata.fileName}，请重新建立任务`);
  }
  if (!GemImporterShared.isMatchingPair(metadata, payload)) {
    throw new Error(`Skill 配对校验失败：${metadata.fileName}，请重新选择文件建立任务`);
  }
  return { ...metadata, text: payload.text };
}

async function createOneGem(item) {
  const createButton = await waitFor(() => findCreateGemButton(), 30000, "找不到“新建 Gem”按钮");
  await addLog("点击：+ 新建 Gem");
  showToast("正在创建 Gem", `点击“+ 新建 Gem”：${item.gemName}`);
  clickElement(createButton);

  const nameInput = await waitFor(() => findNameInput(), 30000, "找不到 Gem 名称输入框");
  setEditableValue(nameInput, item.gemName);

  const instructions = await waitFor(
    () => findSectionEditable(["指令", "Instructions"]),
    30000,
    "找不到“指令”输入区域"
  );
  setEditableValue(instructions, item.text);

  await delay(500);
  const saveButton = await waitFor(
    () => {
      const button = findSaveButton();
      return button && !isDisabled(button) ? button : null;
    },
    30000,
    "“保存”按钮未启用，请检查名称和指令"
  );
  clickElement(saveButton);

  await finishSavedGem(item.gemName);
}

async function finishSavedGem(gemName) {
  const outcome = await waitFor(
    () => {
      const dialog = findCreationSuccessDialog(gemName);
      if (dialog) return { dialog };
      const saveError = findSaveError();
      if (saveError) throw new Error(normalizeText(saveError.textContent || "Gem 保存失败"));
      return null;
    },
    60000,
    `等待“已创建 Gem”成功弹窗超时：${gemName}`
  );

  const closeButton = await waitFor(
    () => findDialogCloseButton(outcome.dialog),
    15000,
    "已创建 Gem，但找不到成功弹窗右上角的 × 号"
  );
  await addLog("点击：成功弹窗右上角 ×");
  showToast("Gem 已保存", "正在关闭成功弹窗 ×");
  clickElement(closeButton);
  await waitFor(
    () => (
      (!document.contains(outcome.dialog) || !isVisible(outcome.dialog)) &&
      !findCreationSuccessDialog(gemName)
    ),
    20000,
    "已点击成功弹窗 × 号，但弹窗没有关闭"
  );
  await addLog("成功弹窗已关闭，下一步返回 Gem 管理器");

}

async function returnToGemManager(gemName) {
  if (isManagerReady()) return;

  let initial;
  try {
    initial = await waitFor(
      () => {
        if (isManagerReady()) return { managerReady: true };
        const backButton = findEditorBackButton();
        return backButton ? { backButton } : null;
      },
      15000,
      `已关闭成功弹窗，但找不到编辑器返回按钮：${gemName}`
    );
  } catch (error) {
    if (["ImportPausedError", "ImportCancelledError"].includes(error.name)) throw error;
    await restartOnManagerPage(`未识别到返回按钮，直接打开 Gem 管理器：${gemName}`);
    return;
  }

  if (initial.managerReady) return;
  await addLog("点击：编辑器左上角返回");
  showToast("正在返回 Gem 管理器", gemName);
  clickElement(initial.backButton);

  let outcome;
  try {
    outcome = await waitFor(
      () => {
        if (isManagerReady()) return { managerReady: true };
        const discardButton = findDiscardChangesButton();
        return discardButton ? { discardButton } : null;
      },
      30000,
      `已点击返回，但未进入 Gem 管理器：${gemName}`
    );
  } catch (error) {
    if (["ImportPausedError", "ImportCancelledError"].includes(error.name)) throw error;
    await restartOnManagerPage(`返回按钮未生效，直接打开 Gem 管理器：${gemName}`);
    return;
  }

  if (outcome.discardButton) {
    clickElement(outcome.discardButton);
    try {
      await waitFor(
        () => isManagerReady(),
        30000,
        `已确认返回，但未进入 Gem 管理器：${gemName}`
      );
    } catch (error) {
      if (["ImportPausedError", "ImportCancelledError"].includes(error.name)) throw error;
      await restartOnManagerPage(`确认返回后页面未切换，直接打开 Gem 管理器：${gemName}`);
    }
  }
}

async function restartOnManagerPage(message) {
  await addLog(message);
  await requestManagerNavigation();
  throw namedError("ImportNavigationRestartError");
}

function findSaveButton() {
  const candidates = visibleElements("button, [role='button']");
  return candidates.find((element) => {
    const label = normalizeText(
      `${element.getAttribute("aria-label") || ""} ${element.getAttribute("title") || ""}`
    );
    return label === "保存 gem" || label === "save gem";
  }) || candidates.find((element) => {
    const text = normalizeText(element.innerText || element.textContent || "");
    return text === "保存" || text === "save";
  }) || null;
}

function findSaveError() {
  return visibleElements("[role='alert'], [aria-live='assertive']").find((element) => {
    const text = normalizeText(element.textContent || "");
    return (
      text.includes("保存失败") || text.includes("无法保存") ||
      text.includes("failed to save") || text.includes("couldn't save") || text.includes("could not save")
    );
  }) || null;
}

function findEditorBackButton() {
  const candidates = visibleElements("button, a, [role='button']").filter(isInteractable);
  const labelled = candidates.find((element) => {
    const label = getElementLabel(element);
    return (
      label.includes("取消编辑或创建操作") ||
      label === "返回" || label === "back" ||
      label.includes("返回 gem 管理器") || label.includes("back to gem manager") ||
      label.includes("关闭 gem 编辑器") || label.includes("close gem editor") ||
      label.includes("退出编辑") || label.includes("exit editor")
    );
  });
  if (labelled) return labelled;

  return candidates
    .filter((element) => {
      const rect = element.getBoundingClientRect();
      const label = getElementLabel(element);
      const looksLikeBackArrow = (
        label.includes("arrow_back") || label.includes("keyboard_arrow_left") ||
        label.includes("chevron_left") || label === "←" || label === "‹"
      );
      const withinEditorHeader = (
        rect.width <= 88 && rect.height <= 88 &&
        rect.left >= 0 && rect.left <= Math.min(window.innerWidth * 0.65, 520) &&
        rect.top >= 0 && rect.top <= 180
      );
      return looksLikeBackArrow && withinEditorHeader;
    })
    .sort((a, b) => {
      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();
      return (aRect.top * 2 + aRect.left) - (bRect.top * 2 + bRect.left);
    })[0] || null;
}

function findCreationSuccessDialog(gemName) {
  const dialogSelectors = [
    "[role='dialog']",
    "[aria-modal='true']",
    "mat-dialog-container",
    ".mat-mdc-dialog-container",
    ".mat-mdc-dialog-surface",
    ".cdk-overlay-pane"
  ].join(", ");
  const dialogs = visibleElements(dialogSelectors);
  const normalizedName = normalizeText(gemName);
  const direct = dialogs.find((dialog) => {
    const text = normalizeText(dialog.textContent || "");
    return isCreationSuccessText(text, normalizedName);
  });
  if (direct) return direct;

  const closeButtons = findVisibleCloseControls();
  for (const closeButton of closeButtons) {
    let container = closeButton.parentElement;
    for (let depth = 0; depth < 8 && container; depth += 1) {
      const rect = container.getBoundingClientRect();
      const text = normalizeText(container.textContent || "");
      if (
        rect.width >= 280 && rect.width <= 1100 &&
        rect.height >= 100 && rect.height <= 900 &&
        (text.includes(normalizedName) || isCreationSuccessText(text, normalizedName))
      ) return container;
      container = container.parentElement;
    }
  }
  return null;
}

function isCreationSuccessText(text, normalizedName) {
  const success = (
    text.includes("已创建") || text.includes("创建成功") || text.includes("创建了") ||
    text.includes("gem has been created") || text.includes("created a gem") ||
    text.includes("gem is ready") || text.includes("successfully created")
  );
  const mentionsGem = text.includes("gem") || (normalizedName && text.includes(normalizedName));
  return success && mentionsGem && (!normalizedName || text.includes(normalizedName) || text.includes("gem"));
}

function findDialogCloseButton(dialog) {
  if (!dialog || !isVisible(dialog)) return null;
  const buttons = Array.from(dialog.querySelectorAll("button, [role='button']")).filter(isVisible);
  const labelled = buttons.find(isCloseControl);
  if (labelled) return labelled;

  const dialogRect = dialog.getBoundingClientRect();
  return buttons
    .filter((button) => {
      const rect = button.getBoundingClientRect();
      return rect.width <= 72 && rect.height <= 72 && rect.top <= dialogRect.top + 100;
    })
    .sort((a, b) => {
      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();
      const aDistance = Math.abs(aRect.top - dialogRect.top) + Math.abs(aRect.right - dialogRect.right);
      const bDistance = Math.abs(bRect.top - dialogRect.top) + Math.abs(bRect.right - dialogRect.right);
      return aDistance - bDistance;
    })[0] || null;
}

function findVisibleCloseControls() {
  const controls = [];
  const candidates = visibleElements(
    "button, [role='button'], mat-icon, [data-mat-icon-name='close'], [fonticon='close']"
  );
  candidates.forEach((candidate) => {
    const control = candidate.matches("button, [role='button']")
      ? candidate
      : candidate.closest("button, [role='button']");
    if (control && isVisible(control) && isCloseControl(control) && !controls.includes(control)) {
      controls.push(control);
    }
  });
  return controls;
}

function isCloseControl(button) {
  const label = normalizeText(
    `${button.getAttribute("aria-label") || ""} ${button.getAttribute("title") || ""} ` +
    `${button.getAttribute("data-mat-icon-name") || ""} ${button.getAttribute("fonticon") || ""} ` +
    `${button.textContent || ""}`
  );
  return (
    label === "×" || label === "✕" || label === "关闭" || label === "close" ||
    label === "dismiss" || label === "clear" || label.includes("关闭对话框") ||
    label.includes("close dialog") || label.includes("关闭弹窗")
  );
}

function findDiscardChangesButton() {
  const dialogs = visibleElements("[role='dialog'], [aria-modal='true'], mat-dialog-container, .mat-mdc-dialog-container");
  for (const dialog of dialogs) {
    const buttons = Array.from(dialog.querySelectorAll("button, [role='button']")).filter(isVisible);
    const button = buttons.find((candidate) => {
      const text = normalizeText(
        `${candidate.getAttribute("aria-label") || ""} ${candidate.textContent || ""}`
      );
      return ["舍弃", "放弃", "不保存", "discard", "discard changes", "leave", "don't save"].includes(text);
    });
    if (button) return button;
  }
  return null;
}

async function ensureManagerPage() {
  if (isManagerReady()) {
    await updateTask({ navigationAttempts: 0 });
    return;
  }

  let managerNav = findManagerNavigation();
  if (!managerNav) {
    const mainMenuButton = findMainMenuButton();
    if (mainMenuButton) {
      clickElement(mainMenuButton);
      try {
        managerNav = await waitFor(
          () => findManagerNavigation(),
          8000,
          "Gemini 左侧导航栏未打开"
        );
      } catch (error) {
        if (["ImportPausedError", "ImportCancelledError"].includes(error.name)) throw error;
        await addLog("左侧导航栏中未找到 Gem/Gems，尝试设置菜单");
      }
    }
  }

  if (managerNav) {
    await addLog("点击：左侧 Gem");
    showToast("正在打开 Gem 管理器", "点击左侧 Gem");
    clickElement(managerNav);
    try {
      await waitFor(() => isManagerReady(), 15000, "进入 Gem 管理器超时");
      await updateTask({ navigationAttempts: 0 });
      return;
    } catch (error) {
      if (["ImportPausedError", "ImportCancelledError"].includes(error.name)) throw error;
    }
  }

  if (await openManagerFromSettings()) {
    await updateTask({ navigationAttempts: 0 });
    return;
  }

  await requestManagerNavigation();
  throw namedError("ImportNavigationRestartError");
}

function isManagerReady() {
  if (!GemImporterShared.isGemManagerPath(location.href) || isEditorVisible()) return false;
  const createButton = findCreateGemButton();
  return Boolean(createButton && isInteractable(createButton));
}

function findManagerNavigation() {
  const candidates = visibleElements("a, button, [role='button'], [role='link']").filter(isInteractable);
  const direct = candidates.find((element) => {
    const href = element.getAttribute("href");
    return href && GemImporterShared.isGemManagerPath(href);
  });
  if (direct) return direct;

  return candidates.find((element) => {
    const labels = getElementLabelParts(element);
    if (!labels.some(GemImporterShared.isGemManagerLabel)) return false;
    return !labels.some(
      (label) => label.includes("新建") || label.includes("create") || label.includes("new gem")
    );
  }) || null;
}

function findMainMenuButton() {
  const labels = ["主菜单", "main menu", "menu"];
  return visibleElements("button, [role='button']")
    .filter(isInteractable)
    .find((element) => getElementLabelParts(element).some((label) => labels.includes(label))) || null;
}

async function openManagerFromSettings() {
  const settingsButton = findSettingsButton();
  if (!settingsButton) return false;

  await addLog("点击：左下角设置");
  showToast("正在打开 Gem 管理器", "侧栏无 Gem/Gems，尝试设置菜单");
  clickElement(settingsButton);

  let gemItem;
  try {
    gemItem = await waitFor(
      () => findSettingsGemItem(settingsButton),
      10000,
      "设置菜单中未找到 Gem/Gems"
    );
  } catch (error) {
    if (["ImportPausedError", "ImportCancelledError"].includes(error.name)) throw error;
    await addLog("设置菜单中未找到 Gem/Gems，改用直达链接");
    return false;
  }

  await addLog(`点击：设置菜单 ${getPreferredElementLabel(gemItem) || "Gem/Gems"}`);
  clickElement(gemItem);
  try {
    await waitFor(() => isManagerReady(), 20000, "通过设置菜单进入 Gem 管理器超时");
    return true;
  } catch (error) {
    if (["ImportPausedError", "ImportCancelledError"].includes(error.name)) throw error;
    await addLog("设置菜单入口未进入 Gem 管理器，改用直达链接");
    return false;
  }
}

function findSettingsButton() {
  const candidates = visibleElements("button, [role='button']").filter(isInteractable);
  const exactLabels = [
    "设置",
    "settings",
    "设置和帮助",
    "设置与帮助",
    "设置和帮助菜单",
    "settings and help",
    "settings & help",
    "open settings",
    "打开设置"
  ];
  const labelled = candidates.find((element) => (
    getElementLabelParts(element).some((label) => exactLabels.includes(label))
  ));
  if (labelled) return labelled;

  const iconCandidate = candidates
    .filter((element) => {
      const label = getElementLabel(element);
      const rect = element.getBoundingClientRect();
      const looksLikeSettings = label === "settings" || label.includes("设置") || label.includes("settings");
      const nearSidebarBottom = (
        rect.left <= Math.min(window.innerWidth * 0.35, 520) &&
        rect.bottom >= window.innerHeight - 220
      );
      return looksLikeSettings && nearSidebarBottom;
    })
    .sort((a, b) => b.getBoundingClientRect().bottom - a.getBoundingClientRect().bottom)[0] || null;
  if (iconCandidate) return iconCandidate;

  return candidates
    .filter((element) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.width >= 24 && rect.width <= 80 && rect.height >= 24 && rect.height <= 80 &&
        rect.left >= 0 && rect.left <= Math.min(window.innerWidth * 0.35, 520) &&
        rect.bottom >= window.innerHeight - 160
      );
    })
    .sort((a, b) => b.getBoundingClientRect().left - a.getBoundingClientRect().left)[0] || null;
}

function findSettingsGemItem(settingsButton) {
  const settingsRect = settingsButton.getBoundingClientRect();
  const candidates = visibleElements(
    "[role='menuitem'], [role='option'], a, button, [role='button'], [role='link']"
  ).filter(isInteractable).filter((element) => {
    if (element === settingsButton) return false;
    return getElementLabelParts(element).some(GemImporterShared.isGemManagerLabel);
  });

  return candidates.sort((a, b) => {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    const aDistance = Math.abs(aRect.left - settingsRect.left) + Math.abs(aRect.bottom - settingsRect.top);
    const bDistance = Math.abs(bRect.left - settingsRect.left) + Math.abs(bRect.bottom - settingsRect.top);
    return aDistance - bDistance;
  })[0] || null;
}

async function requestManagerNavigation() {
  const task = await getTask();
  const attempts = (task?.navigationAttempts || 0) + 1;
  if (attempts > 3) {
    throw new Error(
      "连续 3 次无法进入 Gem 管理器。请确认当前账号能手动打开 https://gemini.google.com/gems/view"
    );
  }
  await updateTask({ navigationAttempts: attempts });
  await addLog(`导航兜底：直接打开 Gem 管理器（${attempts}/3）`);
  const response = await chrome.runtime.sendMessage({
    type: "NAVIGATE_MANAGER",
    taskId: task?.id || null,
    attempt: attempts
  });
  if (!response?.ok) throw new Error(response?.error || "无法自动进入 Gem 管理器");
}

function findCreateGemButton() {
  const labels = ["新建 Gem", "Create a Gem", "Create Gem", "New Gem"].map(normalizeText);
  const candidates = visibleElements("button, a, [role='button']").filter(isInteractable).filter((element) => {
    return getElementLabelParts(element).some((text) => labels.includes(text));
  });
  if (!candidates.length) {
    if (GemImporterShared.isGemManagerPath(location.href)) revealManagerSection();
    return null;
  }

  const localizedButton = candidates.find((candidate) => {
    return getElementLabelParts(candidate).includes(normalizeText("新建 Gem"));
  });
  if (localizedButton) return localizedButton;

  const managerHeading = findExactVisibleText(["Gem 管理器", "Gem manager"]);
  if (managerHeading) {
    const headingRect = managerHeading.getBoundingClientRect();
    const managerButton = candidates
      .filter((candidate) => candidate.getBoundingClientRect().top >= headingRect.top - 80)
      .sort((a, b) => {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();
        return Math.abs(aRect.top - headingRect.top) - Math.abs(bRect.top - headingRect.top);
      })[0];
    if (managerButton) return managerButton;
  }

  if (GemImporterShared.isGemManagerPath(location.href)) {
    return candidates.sort(
      (a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top
    )[0];
  }

  return candidates[0] || null;
}

function findExistingGemByName(gemName) {
  const normalizedName = normalizeText(gemName);
  return visibleElements("a[href^='/gem/']").find((link) => {
    const descendants = Array.from(link.querySelectorAll("span, div, p, h1, h2, h3, h4"));
    return descendants.some(
      (element) => isVisible(element) && normalizeText(element.textContent || "") === normalizedName
    );
  }) || null;
}

function revealManagerSection() {
  const managerHeading = findExactVisibleText(["Gem 管理器", "Gem manager"]);
  if (managerHeading) {
    managerHeading.scrollIntoView({ block: "center", behavior: "auto" });
    return;
  }

  const scrollables = [document.scrollingElement, ...document.querySelectorAll("main, [role='main'], div")]
    .filter(Boolean)
    .filter((element) => element.scrollHeight > element.clientHeight + 100 && element.clientWidth > 500)
    .sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight));
  const target = scrollables[0];
  if (!target) return;
  target.scrollTop = Math.min(target.scrollHeight, target.scrollTop + Math.max(target.clientHeight * 0.8, 500));
  target.dispatchEvent(new Event("scroll", { bubbles: true }));
}

function isEditorVisible() {
  const signals = [
    findNameInput(),
    findSectionEditable(["指令", "Instructions"]),
    findSaveButton()
  ].filter((element) => element && isInteractable(element));
  return signals.length >= 2;
}

function findNameInput() {
  const inputs = visibleElements("input:not([type='hidden']):not([type='file'])");
  return inputs.find((input) => {
    const hint = `${input.getAttribute("aria-label") || ""} ${input.getAttribute("placeholder") || ""}`;
    return /(?:gem.*name|name.*gem|名称|命名)/i.test(hint);
  }) || findInputAfterLabel(["名称", "Name"], inputs);
}

function findSectionEditable(labels) {
  const candidates = visibleElements("textarea, [contenteditable='true'], [role='textbox']")
    .filter((element) => element.tagName !== "INPUT");
  const labelled = findInputAfterLabel(labels, candidates);
  if (labelled) return labelled;
  return candidates.find((element) => {
    const hint = normalizeText(
      `${element.getAttribute("aria-label") || ""} ${element.getAttribute("placeholder") || ""}`
    );
    return (
      hint.includes("介绍你的 gem") || hint.includes("说明它的用途") ||
      hint.includes("describe your gem") || hint.includes("what it does")
    );
  }) || null;
}

function findInputAfterLabel(labels, candidates) {
  const label = findExactVisibleText(labels);
  if (!label) return null;
  const labelRect = label.getBoundingClientRect();
  let best = null;
  let bestScore = Infinity;

  candidates.forEach((candidate) => {
    const rect = candidate.getBoundingClientRect();
    if (rect.top < labelRect.top - 8) return;
    const vertical = Math.max(0, rect.top - labelRect.bottom);
    const horizontal = Math.abs(rect.left - labelRect.left) * 0.15;
    const score = vertical + horizontal;
    if (vertical < 420 && score < bestScore) {
      best = candidate;
      bestScore = score;
    }
  });
  return best;
}

function setEditableValue(element, value) {
  element.scrollIntoView({ block: "center", behavior: "auto" });
  element.focus();

  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
    if (setter) setter.call(element, value);
    else element.value = value;
  } else {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
    if (!document.execCommand("insertText", false, value)) element.textContent = value;
    selection.removeAllRanges();
  }

  element.dispatchEvent(new InputEvent("input", {
    bubbles: true,
    composed: true,
    inputType: "insertText",
    data: value
  }));
  element.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  element.blur();
}

function findClickable(labels) {
  const labelList = Array.isArray(labels) ? labels : [labels];
  const candidates = visibleElements("button, a, [role='button']");
  const exact = candidates.find((element) => {
    const text = normalizeText(element.innerText || element.textContent || element.getAttribute("aria-label") || "");
    return labelList.some((label) => text === normalizeText(label));
  });
  if (exact) return exact;
  return candidates.find((element) => {
    const text = normalizeText(element.innerText || element.textContent || element.getAttribute("aria-label") || "");
    return labelList.some((label) => text.includes(normalizeText(label)));
  }) || null;
}

function findExactVisibleText(labels) {
  const labelList = (Array.isArray(labels) ? labels : [labels]).map(normalizeText);
  const selectors = "h1,h2,h3,h4,label,span,p,div,a,button,[role='heading']";
  return visibleElements(selectors).find((element) => {
    const text = normalizeText(element.innerText || element.textContent || "");
    return labelList.includes(text);
  }) || null;
}

function visibleElements(selector) {
  return Array.from(document.querySelectorAll(selector)).filter(
    (element) => !element.closest("#gem-batch-importer-toast") && isVisible(element)
  );
}

function getElementLabel(element) {
  return getElementLabelParts(element).join(" ");
}

function getPreferredElementLabel(element) {
  return getElementLabelParts(element)[0] || "";
}

function getElementLabelParts(element) {
  if (!element) return [];
  const iconText = Array.from(
    element.querySelectorAll?.("mat-icon, [data-mat-icon-name], [fonticon]") || []
  ).map((icon) => (
    `${icon.getAttribute("data-mat-icon-name") || ""} ` +
    `${icon.getAttribute("fonticon") || ""} ${icon.textContent || ""}`
  )).join(" ");
  return [
    element.innerText || "",
    element.textContent || "",
    element.getAttribute("aria-label") || "",
    element.getAttribute("title") || "",
    iconText
  ].map(normalizeText).filter((label, index, labels) => label && labels.indexOf(label) === index);
}

function isVisible(element) {
  const style = getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  return (
    style.visibility !== "hidden" && style.display !== "none" && style.opacity !== "0" &&
    rect.width > 0 && rect.height > 0
  );
}

function isInteractable(element) {
  if (!element || !isVisible(element) || isDisabled(element)) return false;
  const style = getComputedStyle(element);
  if (style.pointerEvents === "none") return false;

  const rect = element.getBoundingClientRect();
  const left = Math.max(0, rect.left);
  const right = Math.min(window.innerWidth, rect.right);
  const top = Math.max(0, rect.top);
  const bottom = Math.min(window.innerHeight, rect.bottom);
  if (right <= left || bottom <= top) return false;
  if (typeof document.elementFromPoint !== "function") return true;

  const points = [
    [(left + right) / 2, (top + bottom) / 2],
    [left + Math.min(4, (right - left) / 2), top + Math.min(4, (bottom - top) / 2)],
    [right - Math.min(4, (right - left) / 2), bottom - Math.min(4, (bottom - top) / 2)]
  ];
  return points.some(([x, y]) => {
    const topElement = document.elementFromPoint(x, y);
    return Boolean(
      topElement &&
      (topElement === element || element.contains(topElement) || topElement.contains(element))
    );
  });
}

function isDisabled(element) {
  return Boolean(element.disabled || element.getAttribute("aria-disabled") === "true");
}

function clickElement(element) {
  element.scrollIntoView({ block: "center", behavior: "auto" });
  element.focus();
  element.click();
}

function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

async function waitFor(probe, timeoutMs, errorMessage) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    await checkpoint();
    const result = probe();
    if (result) return result;
    await delay(250);
  }
  throw new Error(errorMessage);
}

async function checkpoint() {
  if (globalThis.__gemBatchImporterCommand === "pause") throw namedError("ImportPausedError");
  if (globalThis.__gemBatchImporterCommand === "cancel") throw namedError("ImportCancelledError");

  const task = await getTask();
  if (task?.status === "paused") throw namedError("ImportPausedError");
  if (task?.status === "cancelled") throw namedError("ImportCancelledError");
}

function namedError(name) {
  const error = new Error(name);
  error.name = name;
  return error;
}

async function getTask() {
  const data = await chrome.storage.local.get(GemImporterShared.TASK_KEY);
  return data[GemImporterShared.TASK_KEY] || null;
}

async function updateTask(patch) {
  const task = await getTask();
  if (!task) return;
  Object.assign(task, patch, { updatedAt: Date.now() });
  await chrome.storage.local.set({ [GemImporterShared.TASK_KEY]: task });
}

async function addLog(message) {
  const task = await getTask();
  if (!task) return;
  const time = new Date().toLocaleTimeString("zh-CN", { hour12: false });
  task.log = [...(task.log || []), `[${time}] ${message}`].slice(-60);
  task.updatedAt = Date.now();
  await chrome.storage.local.set({ [GemImporterShared.TASK_KEY]: task });
}

function showToast(title, message, tone = "info") {
  let toast = document.getElementById("gem-batch-importer-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "gem-batch-importer-toast";
    document.documentElement.appendChild(toast);
  }
  toast.dataset.tone = tone;
  toast.innerHTML = "";
  const strong = document.createElement("strong");
  const span = document.createElement("span");
  strong.textContent = title;
  span.textContent = message;
  toast.append(strong, span);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
