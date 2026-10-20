---
name: tiktok-video-appeal
description: 用户发来被判违规的 TikTok 视频链接（加商品链接）、要做申诉材料时使用：输出 500 字符以内的英文申诉理由和 2-3 张证明图，直接发在聊天里。
---
# TikTok 视频违规申诉材料

适用：视频被判"隐私部位暴露"(intimate-area exposure) 或"色情"(sexual content)。申诉页要求：申诉理由 500 字符以内，英文；证明文件为 JPG/PNG，最多 10 张，每张 5MB 以内。

## 换电脑快速开始（分享代码）
```
git clone https://github.com/lawrenceburton452645-code/-.git chalovelo
cd chalovelo/skills/tiktok-video-appeal/scripts
pip install yt-dlp pillow requests      # 另需安装 ffmpeg
python appeal_kit.py --video "<违规视频链接>" --product "<商品主图路径或URL>" \
  --item "pink ruffle babydoll set with stockings" \
  --action "stands and moves naturally while holding her phone" --points 10
```
输出在 appeal_out/：evidence_1_product.jpg、evidence_2_frames.jpg、appeal.txt。截帧默认取视频 6 个均匀时间点；如果有帧带箭头或标注，用 `--times 0.5,3,5,7,11,12.8` 自己指定截帧时间。

## 步骤（AI 助手执行时）
1. 下载视频（yt-dlp），读时长、文案和发布日期。下载不了就让用户发视频文件。
2. 先每隔 2 秒截一帧，拼成总览图，判断违规原因（透视面料、胸部遮挡、画面里的箭头或标注、动作、机位），告诉用户。
3. 商品图：商品页是公开的，不用登录，也不要登录用户的 TikTok 账号。从商品页取对应颜色的白底主图。商品链接没给，就先去仓库资料里找。
4. 运行 appeal_kit.py 生成证明图和申诉理由，再看一遍成品。证明图上不写账号名和日期。
5. 同行对比图可选，只能用真实的、带商品链接的截图；手上没有就直接告诉用户，不要凑数。
6. 交付：英文申诉理由放代码块，附中文意思和字符数；证明图直接发在聊天里；再用一两句话说明可能的违规原因和以后拍摄怎么避开。

## 成功案例（申诉通过）
> Hi team, I think this video was flagged by mistake. It's a short showcase of the green lace set, showing the outfit while standing and walking. The face and full outfit stay in view, with no close-ups of private areas. I've attached video screenshots and the product page for reference. Please take another look at the full video and remove the 10-point deduction and related restrictions. Thank you.

当时上传的证明材料：商品页与视频对比、6 帧截图、同行同类视频对比（带链接）。

## 注意
- 申诉理由只写视频里真实有的内容，不编造，也不攻击审核。
- 不替用户登录后台，也不替用户提交申诉。
- examples/ 里是 001 粉色申诉的示例成品。
