"use strict";

const assert = require("node:assert/strict");
const {
  GEMINI_APP_URL,
  GEM_MANAGER_URL,
  cleanGemName,
  formatBytes,
  itemStorageKey,
  isMatchingPair,
  isGemManagerPath,
  isGemManagerLabel
} = require("../shared.js");

const nameCases = [
  ["01. TikTok 脚本生成器.txt", "TikTok 脚本生成器"],
  ["2、Skill 优化.txt", "Skill 优化"],
  ["003 - 批量视频模板.TXT", "批量视频模板"],
  ["（12） 顶级复刻一体式.txt", "顶级复刻一体式"],
  ["10.3D 产品设计.txt", "3D 产品设计"],
  ["普通名称.txt", "普通名称"],
  ["  08_中文 Skill  .txt", "中文 Skill"]
];

for (const [input, expected] of nameCases) {
  assert.equal(cleanGemName(input), expected, input);
}

assert.equal(formatBytes(0), "0 B");
assert.equal(formatBytes(1024), "1.0 KB");
assert.equal(formatBytes(1024 * 1024), "1.0 MB");
assert.equal(itemStorageKey("batch-a", 37), "gemBatchItem:batch-a:37");
assert.equal(GEMINI_APP_URL, "https://gemini.google.com/app");
assert.equal(GEM_MANAGER_URL, "https://gemini.google.com/gems/view");
const pairMetadata = { pairId: "batch-a:0", fileName: "01. Skill A.txt", gemName: "Skill A" };
assert.equal(isMatchingPair(pairMetadata, { ...pairMetadata, text: "A body" }), true);
assert.equal(isMatchingPair(pairMetadata, { ...pairMetadata, pairId: "batch-a:1", text: "B body" }), false);
assert.equal(isMatchingPair(pairMetadata, { ...pairMetadata, fileName: "02. Skill B.txt", text: "B body" }), false);
assert.equal(isGemManagerPath("https://gemini.google.com/gems/view"), true);
assert.equal(isGemManagerPath("/gems/view?hl=zh-CN"), true);
assert.equal(isGemManagerPath("https://gemini.google.com/app"), false);
assert.equal(isGemManagerPath("https://example.com/gems/view"), false);
assert.equal(isGemManagerLabel("Gem"), true);
assert.equal(isGemManagerLabel("Gems"), true);
assert.equal(isGemManagerLabel("Gem 管理器"), true);
assert.equal(isGemManagerLabel("Gemini"), false);
assert.equal(isGemManagerLabel("新建 Gem"), false);
console.log(`shared.test.js: ${nameCases.length + 18} assertions passed`);
