/* global GemImporterShared */
"use strict";

const { TASK_KEY, cleanGemName, formatBytes, itemStorageKey } = GemImporterShared;
const elements = {
  fileInput: document.getElementById("fileInput"),
  folderInput: document.getElementById("folderInput"),
  pickFilesButton: document.getElementById("pickFilesButton"),
  pickFolderButton: document.getElementById("pickFolderButton"),
  clearButton: document.getElementById("clearButton"),
  fileList: document.getElementById("fileList"),
  emptyState: document.getElementById("emptyState"),
  selectionSummary: document.getElementById("selectionSummary"),
  skipExisting: document.getElementById("skipExisting"),
  itemDelay: document.getElementById("itemDelay"),
  progressPanel: document.getElementById("progressPanel"),
  progressTitle: document.getElementById("progressTitle"),
  progressCount: document.getElementById("progressCount"),
  progressBar: document.getElementById("progressBar"),
  currentItem: document.getElementById("currentItem"),
  errorMessage: document.getElementById("errorMessage"),
  logBox: document.getElementById("logBox"),
  statusDot: document.getElementById("statusDot"),
  startButton: document.getElementById("startButton"),
  pauseButton: document.getElementById("pauseButton"),
  cancelButton: document.getElementById("cancelButton")
};

let selectedFiles = [];
let currentTask = null;

elements.pickFilesButton.addEventListener("click", () => elements.fileInput.click());
elements.pickFolderButton.addEventListener("click", () => elements.folderInput.click());
elements.fileInput.addEventListener("change", (event) => acceptFiles(event.target.files));
elements.folderInput.addEventListener("change", (event) => acceptFiles(event.target.files));
elements.clearButton.addEventListener("click", clearSelection);
elements.startButton.addEventListener("click", startOrResume);
elements.pauseButton.addEventListener("click", () => controlTask("pause"));
elements.cancelButton.addEventListener("click", () => controlTask("cancel"));
if (globalThis.chrome?.storage?.onChanged) {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes[TASK_KEY]) renderTask(changes[TASK_KEY].newValue);
  });
}

restoreTask();

function acceptFiles(fileList) {
  const files = Array.from(fileList || []).filter((file) => file.name.toLowerCase().endsWith(".txt"));
  const unique = new Map(selectedFiles.map((file) => [file.webkitRelativePath || file.name, file]));
  files.forEach((file) => unique.set(file.webkitRelativePath || file.name, file));
  selectedFiles = Array.from(unique.values()).sort((a, b) =>
    (a.webkitRelativePath || a.name).localeCompare(b.webkitRelativePath || b.name, "zh-CN", {
      numeric: true,
      sensitivity: "base"
    })
  );
  renderSelection();
  elements.fileInput.value = "";
  elements.folderInput.value = "";
}

function clearSelection() {
  selectedFiles = [];
  renderSelection();
}

function renderSelection() {
  const totalBytes = selectedFiles.reduce((sum, file) => sum + file.size, 0);
  elements.emptyState.hidden = selectedFiles.length > 0;
  elements.clearButton.hidden = selectedFiles.length === 0;
  elements.startButton.disabled = selectedFiles.length === 0;
  if (selectedFiles.length && currentTask && ["completed", "cancelled"].includes(currentTask.status)) {
    elements.startButton.hidden = false;
    elements.startButton.textContent = "开始新任务";
  }
  elements.selectionSummary.textContent = selectedFiles.length
    ? `${selectedFiles.length} 个文件 · ${formatBytes(totalBytes)}`
    : "尚未选择 TXT";
  elements.fileList.innerHTML = "";

  selectedFiles.slice(0, 200).forEach((file, index) => {
    const item = document.createElement("li");
    item.className = "file-item";
    item.innerHTML = `
      <span class="file-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="file-name"><strong></strong><small></small></span>
      <span class="file-size">${formatBytes(file.size)}</span>`;
    item.querySelector("strong").textContent = cleanGemName(file.name);
    item.querySelector("small").textContent = file.name;
    elements.fileList.appendChild(item);
  });
  if (selectedFiles.length > 200) {
    const remainder = document.createElement("li");
    remainder.className = "file-overflow";
    remainder.textContent = `其余 ${selectedFiles.length - 200} 个文件已进入队列，导入时会全部处理`;
    elements.fileList.appendChild(remainder);
  }
}

async function startOrResume() {
  if (currentTask && ["paused", "error"].includes(currentTask.status)) {
    await controlTask("resume");
    return;
  }

  if (!selectedFiles.length) return;
  setBusy(true);
  const taskId = crypto.randomUUID();
  const storedKeys = [];
  try {
    const items = [];
    elements.progressPanel.hidden = false;
    elements.progressTitle.textContent = "正在建立本地队列";
    for (let index = 0; index < selectedFiles.length; index += 1) {
      const file = selectedFiles[index];
      const storageKey = itemStorageKey(taskId, index);
      const text = await readTextFile(file);
      const pairId = `${taskId}:${index}`;
      const gemName = cleanGemName(file.name);
      await chrome.storage.local.set({
        [storageKey]: {
          pairId,
          fileName: file.name,
          gemName,
          text
        }
      });
      storedKeys.push(storageKey);
      items.push({
        pairId,
        fileName: file.name,
        relativePath: file.webkitRelativePath || file.name,
        gemName,
        size: file.size,
        storageKey
      });
      elements.progressCount.textContent = `${index + 1} / ${selectedFiles.length}`;
      elements.progressBar.style.width = `${Math.round(((index + 1) / selectedFiles.length) * 100)}%`;
      elements.currentItem.textContent = file.name;
    }

    const task = {
      id: taskId,
      createdAt: Date.now(),
      currentIndex: 0,
      completed: 0,
      skipped: 0,
      options: {
        skipExisting: elements.skipExisting.checked,
        itemDelayMs: Number(elements.itemDelay.value)
      },
      items
    };
    const response = await chrome.runtime.sendMessage({ type: "START_IMPORT", task });
    if (!response?.ok) throw new Error(response?.error || "无法启动导入任务");
    window.close();
  } catch (error) {
    if (storedKeys.length) await chrome.storage.local.remove(storedKeys);
    showLocalError(error.message);
    setBusy(false);
  }
}

async function readTextFile(file) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let text = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
  const replacementRatio = (text.match(/\uFFFD/g) || []).length / Math.max(text.length, 1);
  if (replacementRatio > 0.01) text = new TextDecoder("gb18030").decode(bytes);
  return text.replace(/^\uFEFF/, "");
}

async function controlTask(command) {
  const response = await chrome.runtime.sendMessage({ type: "CONTROL_IMPORT", command });
  if (!response?.ok) showLocalError(response?.error || "操作失败");
}

async function restoreTask() {
  if (!globalThis.chrome?.storage?.local) return;
  const data = await chrome.storage.local.get(TASK_KEY);
  if (data[TASK_KEY]) renderTask(data[TASK_KEY]);
}

function renderTask(task) {
  currentTask = task;
  const total = task.items?.length || 0;
  const processed = Math.min((task.completed || 0) + (task.skipped || 0), total);
  const percent = total ? Math.round((processed / total) * 100) : 0;
  const labels = {
    queued: "等待 Gemini",
    running: "正在导入",
    paused: "已暂停",
    error: "导入中断",
    completed: "导入完成",
    cancelled: "已取消"
  };

  elements.progressPanel.hidden = false;
  elements.progressTitle.textContent = labels[task.status] || task.status;
  elements.progressCount.textContent = `${processed} / ${total}`;
  elements.progressBar.style.width = `${percent}%`;
  elements.currentItem.textContent = task.currentName || "准备中…";
  elements.errorMessage.hidden = !task.error;
  elements.errorMessage.textContent = task.error || "";
  elements.logBox.innerHTML = "";
  (task.log || []).slice(-6).forEach((line) => {
    const row = document.createElement("span");
    row.className = "log-line";
    row.textContent = line;
    elements.logBox.appendChild(row);
  });

  elements.statusDot.className = "status-dot";
  if (["queued", "running"].includes(task.status)) elements.statusDot.classList.add("running");
  if (task.status === "completed") elements.statusDot.classList.add("done");
  if (task.status === "error") elements.statusDot.classList.add("error");

  const isActive = ["queued", "running"].includes(task.status);
  elements.pauseButton.hidden = !isActive;
  elements.cancelButton.hidden = !isActive;
  elements.startButton.hidden = isActive || (["completed", "cancelled"].includes(task.status) && !selectedFiles.length);
  if (["paused", "error"].includes(task.status)) {
    elements.startButton.hidden = false;
    elements.startButton.disabled = false;
    elements.startButton.textContent = task.status === "error" ? "重试当前项" : "继续导入";
  }
  setInputsDisabled(isActive);
}

function setBusy(busy) {
  elements.startButton.disabled = busy || selectedFiles.length === 0;
  elements.startButton.textContent = busy ? "准备中…" : "开始导入";
}

function setInputsDisabled(disabled) {
  elements.pickFilesButton.disabled = disabled;
  elements.pickFolderButton.disabled = disabled;
  elements.skipExisting.disabled = disabled;
  elements.itemDelay.disabled = disabled;
}

function showLocalError(message) {
  elements.progressPanel.hidden = false;
  elements.progressTitle.textContent = "无法启动";
  elements.errorMessage.hidden = false;
  elements.errorMessage.textContent = message;
  elements.statusDot.className = "status-dot error";
}
