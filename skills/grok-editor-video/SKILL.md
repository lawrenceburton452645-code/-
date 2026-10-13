---
name: grok-editor-video
description: Generate a Grok video from the editor's own reference images and prompt using Eddie's restricted Grok video relay. Use when the editor asks Codex to run a Grok video and download the MP4.
---

# Grok video for the editor

Use the bundled `grok-video.ps1` on this Windows computer. The relay accepts only JPEG, PNG, or WebP reference images, a prompt, and a 1–15 second duration. It fixes the model to `grok-imagine-video-1.5-preview`, 720p, 9:16. It cannot access Director-Master, Workbench administration, other projects, or provider credentials.

Before submitting, show the mode, image count, duration, and estimated charge. One image defaults to single-image I2V; two or more images default to multi-reference video. Use `-Mode reference` for one-image reference mode when deliberately chosen. Send only the selected authorized images needed for the shot; do not upload a reference MP4. Submit once, save the returned job ID, poll the same job, and download its MP4. Never resubmit an uncertain or pending job. On timeout, rerun the script with `-ResumeJobId`.

Example:

```powershell
powershell -ExecutionPolicy Bypass -File .\grok-video.ps1 -Images .\start.jpg -PromptFile .\prompt.txt -Duration 10 -Output .\shot.mp4
```

Daily spending and job-count caps are currently unset by Eddie. A rejected or failed result is not permission to retry automatically.
