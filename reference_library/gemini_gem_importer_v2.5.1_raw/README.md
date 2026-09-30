# Gemini Gem TXT Importer

兼容修复版本：`2.5.1`

批量读取 TXT Skill，并按顺序创建 Gemini Gem。

## 自动流程

1. 打开 Gemini 首页并自动展开左侧导航栏。
2. 自动点击左侧“Gem”进入 Gem 管理器。
3. 自动点击“Gem 管理器”中“我的 Gem”旁边的中文“+ 新建 Gem”，避开顶部 Labs 的英文入口。
4. 使用 TXT 文件名作为 Gem 名称。
5. 自动清除文件名前面的编号、点号和分隔符。
6. 把 TXT 全部文字复制到“指令”。
7. 保存后通过成功弹窗、保存状态、按钮状态和页面状态多重确认结果。
8. 必须等待“已创建 Gem”成功弹窗出现，点击右上角叉号，并确认弹窗完全消失。
9. 弹窗消失后才点击编辑页左上角返回箭头，并处理可能出现的返回确认框。
10. 确认已经返回 Gem 管理器后继续下一份 TXT。
11. Gemini 页面跳转或标签页重新打开时，自动从首页点击 Gem 并续跑当前任务。
12. 左侧导航没有 `Gem`/`Gems` 时，自动点击左下角设置，再点击设置菜单中的 `Gem`/`Gems`。
13. 保存成功后严格执行“关闭成功弹窗 × → 点击编辑器返回 → 确认 Gem 管理器已恢复”，确认前不会开始下一项。
14. UI 入口识别失败时直接打开 `/gems/view`，最多重试 3 次并给出明确错误，不会无限刷新首页。

每个 TXT 都使用独立的 `pairId` 保存原文件名、Gem 名称和正文。执行前会核对三者，确保同一个 TXT 的名称只会配对该 TXT 自己的指令正文。

最终版不再操作“知识”区域，不上传文件，也不使用 Chrome `debugger` 权限。

## 安装

1. 打开 `chrome://extensions/`。
2. 删除旧版 Gemini 导入插件。
3. 开启“开发者模式”。
4. 点击“加载已解压的扩展程序”。
5. 选择 `gemini-gem-text-importer-final` 文件夹。
6. 确认扩展版本为 `2.5.1`。

## 使用

1. 点击扩展图标。
2. 选择多个 TXT，或选择包含 TXT 的文件夹。
3. 核对清洗后的 Gem 名称。
4. 点击“开始导入”。
5. 保持 Gemini 标签页开启，插件会依次创建并保存。

插件不限制 TXT 数量，实际处理能力受本机磁盘空间和 Gemini 账号限制影响。

## 本地检查

```powershell
node tests/shared.test.js
node tests/navigation-regression.test.js
node --check background.js
node --check popup.js
node --check content.js
```
