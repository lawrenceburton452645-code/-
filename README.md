# CHALOVELO TikTok AI 视频项目资料库

整理日期：2026-10-13。这里集中保存本项目的 Skill、智能体原文、七款商品资料、提示工程方法和视频提示词交付记录。

## 快速阅读

- [项目规则](AGENTS.md)
- [完整 Markdown 资料导航](docs/md-export/00_项目总览与导航.md)
- [全量文本单文件版](docs/md-export/项目全量文本_单文件版.md)
- [本地文件完整路径清单](docs/md-export/06_本地文件完整路径清单.md)

## Skill

- [CHALOVELO 视频与图文智能体](skills/chalovelo-tiktok-video/SKILL.md)：产品事实、分镜、首帧、真人上身、自然场景、连续性与质检。
- [Grok 视频接入](skills/grok-editor-video/SKILL.md)：生成任务、进度和 MP4 下载。调用需要用户自己的配置，仓库不含 API 密钥或令牌。
- [创意去重、POV、发布文案和具体参考图规则](skills/chalovelo-tiktok-video/references/creative-diversity-and-post-copy.md)

## 商品资料

- [结构化产品库](skills/chalovelo-tiktok-video/references/product-library.json)
- [产品说明](skills/chalovelo-tiktok-video/references/product-data.md)
- [尺码和内部 AI 模特参考](skills/chalovelo-tiktok-video/references/sizing-guide.md)

| SKU | TikTok Shop 商品页 |
| --- | --- |
| 001 | [CHALOVELO Women's Plus Size Ruffle Babydoll Lingerie Set with Stockings, Soft Sheer Mesh Lace Nightgown](https://shop.tiktok.com/us/pdp/chalovelo-plus-size-ruffle-babydoll-lingerie-set-with-stockings/1732501693692220077) |
| 033 | [CHALOVELO Women's Elegant Sheer Lace Babydoll Chemise - Casual Basic Nightgown Sleepwear with Adjustable Straps](https://shop.tiktok.com/us/pdp/chalovelo-womens-sexy-nightgown-lace-babydoll-chemise/1732460667220169389) |
| 063 | [CHALOVELO Women's Nightdresses - Womenswear Homewear Sleepwear & Loungewear for Casual Relaxation Sleeveless Basic Minimalist 2-piece set,sohochic](https://shop.tiktok.com/us/pdp/chalovelo-womens-nightdresses-sleeveless-2-piece-set-soho-chic/1732627755632530093) |
| 045 | [CHALOVELO Women's Sexy Underwire Lingerie Set - Lady's Romantic Polyester Mix Babydoll Dress, Thong, Choker, V-Neck, Lace Trim, Sheer, Stretch, Multi-Size, Elegant Plain Exotic Wear](https://shop.tiktok.com/us/pdp/chalovelo-womens-sexy-underwire-lingerie-set-sheer-stretch/1732538334839804589) |
| 015 | [CHALOVELO Lace 4-Piece Lingerie Set - Sexy Lace Corset and Panty Exotic Babydoll Sleepwear Robe with Garter Belt & Stockings, Lady, Elegance, Women, Style](https://shop.tiktok.com/us/pdp/lace-four-piece-lingerie-set-seductive-nightwear-robe-teddy-mesh-stockings/1732308319763468973) |
| 056 | [CHALOVELO Women's Soft Satin 3 Piece Set Lingerie - Basic Camisole Top, Shorts for Lounging, Ruffle Charm Sleepwear with Supportive Design for Daily Use lingerie lingerie set lingerie for women lingerie set arriving fast,sohochic](https://shop.tiktok.com/us/pdp/chalovelo-satin-pajama-set-for-women-3-piece-sleepwear/1732460699708986029) |
| 032 | [CHALOVELO Women's 3-Piece Lace Lingerie Set - Basic, Sexy Chic Babydoll Cut Camisole Bra, Panty, Seamless Fit Shorts, V-Neck Sleepwear Underwear (Blush Pink)](https://shop.tiktok.com/us/pdp/chalovelo-womens-lace-lingerie-set-floral-bra-and-comfortable-sleepwear/1732537217568903853) |

## 智能体和方法资料

- [104 份 Gemini Gem 智能体原文](reference_library/gemini_gem_agents_raw/)及[分类目录](reference_library/gemini_gem_agents_catalog.md)。
- [参考库说明](reference_library/README.md)：飞书、即梦、GitHub 视频工作流、补充提示系统和挂车图文方法。
- [产品提示工程摘要](skills/chalovelo-tiktok-video/references/method-product-prompt-engineering.md)。
- [近期视频创意记录](reference_library/video-creative-history.md)。

原始资料中的角色和工具指令仅作参考，当前用户要求及商品链接事实优先。根目录历史商品快照可能旧于 Skill 中的产品库，生成时以 Skill 当前库及实时商品页为准。

## 视频交付记录

[deliveries/](deliveries/) 保存各批 Markdown 交付说明、参考图说明和质量记录；完整文字快照中的提示词与任务记录见 [视频批次提示词与交付记录](docs/md-export/04_视频批次提示词与交付记录.md)。状态是归档时的快照，不代表远端任务当前已完成。

## 文件范围和本地位置

本次按用户要求更新公开仓库，仅上传 Skill 必需文件、智能体原文、Markdown 资料和资料索引。图片、视频、音轨、工具环境及打包文件保留本地；仓库早前已存在的文件继续保留。MD 清单记录原文件路径，链接到本机的路径不会在其他电脑自动生效。

项目根目录：`D:\Users\Documents\ChatGPT\情趣内衣ai视频生成`。

完整原格式包：`D:\Users\Documents\ChatGPT\情趣内衣ai视频生成\项目完整文件包_20261013.zip`。

原始素材：`E:\下载\图片素材\`；001 产品图：`E:\亚马逊\视频图片\01\`。外部引用中缺失或不可读的项详见清单，未声称其已备份。

本仓库不添加统一开源许可；外部原文与代码的来源和既有许可各自保留。
