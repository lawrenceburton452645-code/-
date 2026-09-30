"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const background = fs.readFileSync(path.join(root, "background.js"), "utf8");
const content = fs.readFileSync(path.join(root, "content.js"), "utf8");

assert.match(background, /chrome\.tabs\.update\(tabId, \{ url: GEM_MANAGER_URL, active: true \}\)/);
assert.doesNotMatch(background, /navigateTaskToManager[\s\S]*?url: GEMINI_APP_URL/);
assert.match(content, /openManagerFromSettings\(\)/);
assert.match(content, /findSettingsGemItem/);
assert.match(content, /navigationAttempts[\s\S]*?attempts > 3/);

const createIndex = content.indexOf("await createOneGem(item);");
const advanceIndex = content.indexOf("currentIndex: index + 1", createIndex);
const returnIndex = content.indexOf("await returnToGemManager(item.gemName);", advanceIndex);
const delayIndex = content.indexOf("await delay(task.options.itemDelayMs || 2000);", returnIndex);
assert.ok(createIndex >= 0, "create step exists");
assert.ok(advanceIndex > createIndex, "saved item is committed before navigation");
assert.ok(returnIndex > advanceIndex, "return runs after saved state is committed");
assert.ok(delayIndex > returnIndex, "the next item cannot start before return completes");

const closeIndex = content.indexOf("clickElement(closeButton);");
const closedLogIndex = content.indexOf("成功弹窗已关闭，下一步返回 Gem 管理器", closeIndex);
assert.ok(closeIndex >= 0 && closedLogIndex > closeIndex, "dialog closes before the return step");

console.log("navigation-regression.test.js: 10 assertions passed");
