(function initShared(root) {
  "use strict";

  const TASK_KEY = "gemBatchTask";
  const ITEM_PREFIX = "gemBatchItem:";
  const GEMINI_APP_URL = "https://gemini.google.com/app";
  const GEM_MANAGER_URL = "https://gemini.google.com/gems/view";

  function cleanGemName(fileName) {
    let name = String(fileName || "")
      .replace(/\.txt$/i, "")
      .normalize("NFKC")
      .trim();

    name = name
      .replace(/^[\s\u2022\u25cf\u25aa\u25e6]+/u, "")
      .replace(
        /^\s*(?:[\[(（【]?\d{1,4}[\])）】]?|[一二三四五六七八九十百]+)\s*(?:[.．、,，:：_\-–—]+\s*|\s+)/u,
        ""
      )
      .trim();

    return name || "未命名 Skill";
  }

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function itemStorageKey(taskId, index) {
    return `${ITEM_PREFIX}${taskId}:${index}`;
  }

  function isMatchingPair(metadata, payload) {
    return Boolean(
      metadata &&
      payload &&
      metadata.pairId === payload.pairId &&
      metadata.fileName === payload.fileName &&
      metadata.gemName === payload.gemName
    );
  }

  function isGemManagerPath(value) {
    try {
      const url = new URL(String(value || ""), "https://gemini.google.com");
      return url.origin === "https://gemini.google.com" && url.pathname.startsWith("/gems/view");
    } catch (_) {
      return false;
    }
  }

  function isGemManagerLabel(value) {
    const label = String(value || "").replace(/\s+/g, " ").trim().toLowerCase();
    if (!label || label === "gemini") return false;
    if ([
      "gem",
      "gems",
      "gem 管理器",
      "gem 管理中心",
      "gem manager",
      "gems manager",
      "manage gems",
      "我的 gem",
      "我的 gems",
      "my gems"
    ].includes(label)) return true;
    return /^(?:打开|进入|前往|查看|open|go to|view)\s*(?:gem|gems|gem 管理器|gem manager)$/.test(label);
  }

  const api = {
    TASK_KEY,
    ITEM_PREFIX,
    GEMINI_APP_URL,
    GEM_MANAGER_URL,
    cleanGemName,
    formatBytes,
    itemStorageKey,
    isMatchingPair,
    isGemManagerPath,
    isGemManagerLabel
  };
  root.GemImporterShared = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
