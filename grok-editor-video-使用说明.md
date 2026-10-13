# Grok 视频生成接入说明

2026-10-10：已将 E:\grok 的全部 5 个文件复制到本项目，并校验 SHA-256 一致。原项目仍保留。

## 文件与安装状态

- 原始压缩包：`grok-editor-video-windows.zip`
- 原始解压文件：`grok-editor-video-windows/grok-editor-video/`
- 项目技能副本：`skills/grok-editor-video/`
- 当前用户已安装技能：`C:\Users\user\.codex\skills\grok-editor-video\`
- 调用名称：`$grok-editor-video`
- 本机共享配置：`%APPDATA%\GrokEditor\config.json`
- 本机共享令牌：`%APPDATA%\GrokEditor\token.dat`，由当前 Windows 用户加密保存。

同一 Windows 用户的项目共用已安装技能和配置，本项目可直接调用，无须再次安装或输入令牌。令牌未复制进本项目，也没有写进说明文件。

## 项目工作流程

1. 按本项目 AGENTS.md 和 `$chalovelo-tiktok-video` 编写或审核产品提示词，确认产品事实、参考图和时间线。
2. 用户要求实际生成视频时，调用 `$grok-editor-video`，仅上传用户为该镜头选定的参考图片。
3. 提交前说明模式、图片数、时长和预估费用。只提交一次，记录 job ID，查询同一任务并下载 MP4。
4. 任务仍在等待时使用 `-ResumeJobId` 继续查询；失败或结果不确定时不要自动重复提交。

可以在聊天里说：使用 Grok，根据这些参考图片和这段提示词生成 10 秒视频，并下载到本项目。

## 当前脚本接口

- 输入：1–7 张 JPG/PNG/WebP 图片，以及 UTF-8 提示词文本文件。
- 每张图最多 5 MB，图片合计最多 12 MB；提示词 1–4096 字符。
- 时长：1–15 秒；固定模型 `grok-imagine-video-1.5-preview`、720p、9:16。
- 单图默认 single，多图默认 reference；单图需要 reference 模式时显式指定。
- 预估预算公式来自随包脚本：`Round((0.14 * 秒数 + 0.01 * 图片数) * 1.2, 2)` 美元；单图 10 秒约 1.69 美元，实际费用以返回值为准。

从项目目录运行 PowerShell 示例：

```powershell
powershell -ExecutionPolicy Bypass -File .\skills\grok-editor-video\grok-video.ps1 -Images .\start.jpg -PromptFile .\prompt.txt -Duration 10 -Output .\shot.mp4
```

## 既有安装修复

原安装脚本保存 `token.dat` 时在末尾添加换行，而视频脚本使用 `Get-Content -Raw` 后直接解密，可能报格式错误。本机安装时已去掉令牌文件末尾换行并验证当前 Windows 用户可正常解密。

原始压缩包及脚本保持原样。若以后重新安装后出现该错误，可仅规范化加密文本（不会输出明文令牌）：

```powershell
$grokTokenPath = Join-Path $env:APPDATA 'GrokEditor\token.dat'
$grokEncryptedText = (Get-Content -Raw -LiteralPath $grokTokenPath).Trim()
[IO.File]::WriteAllText($grokTokenPath, $grokEncryptedText, [Text.Encoding]::ASCII)
```

尚未提交视频生成任务，也未验证远端令牌权限或生成结果。