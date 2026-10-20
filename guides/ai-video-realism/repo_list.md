# GitHub 女装/内衣 TikTok 视频提示词仓库调研（2026-10-20）
⭐=stars，日期=最后更新（UTC）。全部为公开仓库，已打开 README/文件确认内容；已排除 NSFW。

## 0. 人物原生感 / 去AI脸（最高优先）
1. Kingsley-Cyber/ai-video-movement-prompt-system ⭐0 2026-10-05 https://github.com/Kingsley-Cyber/ai-video-movement-prompt-system — 最实用：实测"iPhone原生UGC"预设、反AI皮肤配方、面部微动作层。关键文件 references/iphone_rawugc_realism.md、assets/reference_still.iphone12_morning.txt
2. bchenner/nanobanana-prompter ⭐2 2026-09-10 https://github.com/bchenner/nanobanana-prompter — 写实UGC图片提示词手册：混合不完美光、手机支架式偏心构图、生活杂物、必写皮肤纹理行；含镜子自拍JSON示例 reference/prompt-examples.md
3. anan235/open-ugc-kit ⭐1 2026-09-09 https://github.com/anan235/open-ugc-kit — CC BY 4.0，209条 Seedance 2.5 写实UGC提示词（首帧图+图生视频），100个开场
4. junhao-ye/sns-realistic-portrait-prompt ⭐6 2026-10-13 https://github.com/junhao-ye/sns-realistic-portrait-prompt — 日常手机感人像Skill，"自然优先于精致"规则
5. LunarXuan/natural-sns-portrait ⭐26 2026-10-20 https://github.com/LunarXuan/natural-sns-portrait — 中文，日常手机人像提示词Skill
6. xTreeRoot/visual-prompt-atlas-prompt-json ⭐7 2026-10-15 https://github.com/xTreeRoot/visual-prompt-atlas-prompt-json — 从真实视频蒸馏的动作/服装/表情/背景 JSON 库
7. GitHub30/Reproducible-Photorealistic-Nano-Banana-Pro-JSON-Prompts ⭐60 2026-10-18 https://github.com/GitHub30/Reproducible-Photorealistic-Nano-Banana-Pro-JSON-Prompts — 可复现写实人像JSON提示词
8. artokun/ComfyUI-Photoreal-Prompt-Builder ⭐40 2026-10-18 https://github.com/artokun/ComfyUI-Photoreal-Prompt-Builder — 结构化写实提示词构建器（FLUX）
9. dollaz-ai/ai-audio-mixer ⭐0 2026-04-09 https://github.com/dollaz-ai/ai-audio-mixer — 让AI视频音频像iPhone实录（声音去AI感）

### 提炼：人物原生感短语
- 正向皮肤："fine visible pores on cheeks and nose, subtly uneven skin tone, faint fine lines, slight under-eye puffiness, light oil sheen only in the T-zone, faint natural redness by the nose"（Kingsley-Cyber）
- 千万别写 "smooth skin"——它会导致蜡质塑料脸（Kingsley-Cyber）
- 负向："smooth_ai_skin, waxy_skin, poreless, airbrushed, uniform_skin_tone, plastic_skin, beauty_smoothing, frozen_stiff_face"（Kingsley-Cyber）
- 定调句："looks like an unfiltered real iPhone photo of real skin — the OPPOSITE of smooth AI skin"（Kingsley-Cyber）
- 图生视频：皮肤质感由首帧图决定，纹理要先写进首帧图（Kingsley-Cyber, open-ugc-kit "Still first"）
- 面部微动作："natural eye movement and small darts, gentle blinks, tiny brow flickers, soft cheek and lip micro-shifts, small head bobs; relaxed, never stiff or frozen"（Kingsley-Cyber）
- 表演放松：像跟朋友说话，不"表演"；一次侧瞥再看回来；小耸肩（Kingsley-Cyber）
- "Real skin, real rooms, real light — no beauty filter, no studio grade"（open-ugc-kit）
- 不写 masterpiece / 8K / perfect face 这类空词，写可观察的细节；单一连贯光源；姿势要能做到；手入镜才写手部结构（junhao-ye）
- 头发：写具体发型状态，如 "loose and casual, tucked slightly into hoodie"（bchenner 示例）
- 偏心构图 + 手机支架角度 + 生活杂物（bchenner）
- 大码身材：没找到专门仓库。建议写具体体型词（"plus-size, soft natural curves, realistic body proportions, fabric creasing at the waist"）并在负向里加 "slimmed body, distorted proportions"（这是我的建议，不是出自某个仓库）

## 1. 内衣 / 贴身衣物（含过审）
1. fsn021920-prog/virtual-try-on-video ⭐0 2026-08-26 https://github.com/fsn021920-prog/virtual-try-on-video — 唯一有专门内衣分类的：references/category-lingerie.md（7要素审图、电商/专业私房场景、负向词含 "inappropriate exposure"、光比 1.5:1/4800K/105mm f4、只拍蕾丝/扣件/侧翼拉伸的细节动作）；另有 category-dresses.md
2. muzi-lc/lingerie-creator-video-analysis-skill ⭐0 2026-08-06 https://github.com/muzi-lc/lingerie-creator-video-analysis-skill — 内衣达人视频分析Skill（README 打不开，内容未核实）
3. nexscope-ai/eCommerce-Skills ⭐1197 https://github.com/nexscope-ai/eCommerce-Skills — tiktok-shop-compliance/SKILL.md（TikTok Shop 合规通用，没有内衣专章）
4. xixihhhh/clipforge ⭐1037 https://github.com/xixihhhh/clipforge — 带货视频工具，有广告合规检测模块 docs/feature-compliance.html
5. kezd088/100x-skill-tiktok ⭐11 https://github.com/kezd088/100x-skill-tiktok — skills/100x-localize/profiles/compliance-conservative.md（保守合规档）
结论：GitHub 上没有专门讲"内衣视频如何躲过 TikTok 裸露/色情判定"的仓库。最接近的是 fsn021920 的 lingerie 规则："professional e-commerce, not sexualized"、"tasteful framing"，以及特写只拍面料/五金。

## 2. AI视频提示词库（含时尚/电商板块）
1. renoise-ai/awesome-seedance-prompts ⭐8 2026-10-20 https://github.com/renoise-ai/awesome-seedance-prompts — 290+ 条 Seedance 2.0，fashion/outfit 相关内容很多
2. songguoxs/awesome-video-prompts ⭐588 2026-10-19 https://github.com/songguoxs/awesome-video-prompts — Veo3/Kling/Hailuo，含服装片段
3. cliprise/awesome-ai-fashion-video-prompts ⭐2 2026-09-10 https://github.com/cliprise/awesome-ai-fashion-video-prompts — 服装广告、lookbook、试穿视频模板
4. cliprise/awesome-ai-product-video-prompts ⭐10 2026-10-15 https://github.com/cliprise/awesome-ai-product-video-prompts — 商品图转视频、TikTok UGC 商品视频
5. fsn021920-prog/virtual-try-on-video（见上）— 真人试穿、平铺图转模特两种模式
6. dingtom336-gif/fashion-video-creator ⭐1 2026-05-13 https://github.com/dingtom336-gif/fashion-video-creator — 穿搭视频：虚拟模特图 + Seedance 提示词 + 操作手册
7. raphaelguilhem-dot/fashion-camera-movements ⭐0 2026-09-30 https://github.com/raphaelguilhem-dot/fashion-camera-movements — 时尚视频运镜库
8. Reviral-ai/awesome-kling-prompts ⭐0 2026-08-26 https://github.com/Reviral-ai/awesome-kling-prompts — Kling，含 fashion/商品动态
9. HuyLe82US/awesome-seedance-prompts ⭐69 2026-09-30 https://github.com/HuyLe82US/awesome-seedance-prompts — prompts/03-ugc-social（自拍类 UGC）
10. Silin144/muse-sketch-studio ⭐7 https://github.com/Silin144/muse-sketch-studio — 服装设计稿转走秀视频
11. Anatomic-universalquantifier643/shop-tryon-skill ⭐1 2026-10-12 https://github.com/Anatomic-universalquantifier643/shop-tryon-skill — 多角度虚拟试穿图
12. liu-kaining/Awesome-Veo3-Prompts ⭐75；WaveSpeedAI/awesome-kling-api ⭐2；laofa668/awesome-seedance-prompts ⭐0 — 通用库，含少量 fashion 条目

## 3. TikTok 带货脚本与钩子
1. xigua0626/tiktok-ugc-seedance ⭐5 2026-09-09 https://github.com/xigua0626/tiktok-ugc-seedance — 商品 + TikTok 参考视频 → UGC 脚本 + Seedance 提示词（含 try-on），scripts/extract_tiktok_reference.py
2. cliprise/awesome-ai-ugc-video-prompts ⭐49 2026-10-14 https://github.com/cliprise/awesome-ai-ugc-video-prompts — UGC 模板：Camera/Setting/Audio/CTA 结构
3. ugcadai-byte/ugc-ad-prompts ⭐3 2026-10-10 https://github.com/ugcadai-byte/ugc-ad-prompts — 500+ UGC 广告提示词和钩子
4. xianyu110/ecommerce-video-skills ⭐86 https://github.com/xianyu110/ecommerce-video-skills — 12个技能：3秒钩子、卖点分镜、图生视频提示词、TikTok Shop 导出
5. zhuzhuxia988/tiktok-ugc-script-generator ⭐12 https://github.com/zhuzhuxia988/tiktok-ugc-script-generator — 跨境 UGC 带货脚本生成
6. jasonlee-breadcrumb/silent-ugc ⭐74 https://github.com/jasonlee-breadcrumb/silent-ugc — 复刻无声 TikTok UGC（AI 演员）
7. MegaTroll222/OMNI-UGC-AD-FACTORY ⭐16 https://github.com/MegaTroll222/OMNI-UGC-AD-FACTORY — 商品 + 演员参考图 → 20 秒口播广告
8. cliprise/awesome-ai-video-ads-prompts ⭐8；djcode0718/UGC-Ad-Studio ⭐8 — 广告钩子/脚本
9. aronhy/tiktok-agent-skills ⭐172 https://github.com/aronhy/tiktok-agent-skills — TikTok Shop 爆款视频发现、字幕提取

## 4. 中文资源
1. Susanzz101/Susan-AI-Video-Prompt-skill ⭐10 2026-10-10 https://github.com/Susanzz101/Susan-AI-Video-Prompt-skill — 服装展示、口播带货、视频反推复刻
2. binghe1980/ecommerce-video-prompts ⭐10 https://github.com/binghe1980/ecommerce-video-prompts — 电商视频提示词工作台
3. ai-fzx/fzx_daihuo_prompt_skill ⭐6 https://github.com/ai-fzx/fzx_daihuo_prompt_skill — 根据图片出带货提示词（gpt-image2 + seedance2）
4. wanghaoyu070/generate-product-video-prompt ⭐0 https://github.com/wanghaoyu070/generate-product-video-prompt — 商品图 → 10秒视频提示词（含服装）
5. zhigangfu977-dev/ecommerce-design ⭐1 https://github.com/zhigangfu977-dev/ecommerce-design — TikTok Shop 服装主图和 AI 视频提示词
6. SoraEase/sora-prompt-zh ⭐129；marsoyang1/awesome-seedance-prompts ⭐33；anyhui/video-storyboard-gen-skill ⭐25（即梦分镜）；sjj0268/seedance2.0-prompt-skill ⭐2；zhengzhentao86/zhentao-product-video-prompt-writer ⭐1
7. khanhhuyenngo985-sys/character-scene-design-skills ⭐15 — 角色一致性、服装状态锁定

## 5. 真实美式家居背景
没有找到专门的"美国家居背景"仓库（搜 american home interior prompt 无结果；AlexianIulian/higgsfield-interiors-prompts 只有家装方向）。可用的片段：
- "ordinary, slightly cluttered room (bathroom/bedroom) — not a styled set"（Kingsley-Cyber）
- "narrative clutter"；"clean minimalist apartment bedroom, mid-century modern wooden chair, framed art poster"（bchenner 镜子自拍示例）
- "Setting: real home kitchen with daylight / bathroom / car"（cliprise UGC）
- "lived-in context"（junhao-ye）
- 我的建议（不是出自某个仓库）：写具体的美式元素，如 "beige carpet, white popcorn ceiling, closet with sliding mirrored doors, unmade queen bed with grey duvet, IKEA-style dresser"

## 6. 光线技巧
1. Rylaispirit/cinematic-video-prompt-skill ⭐152 2026-10-19 https://github.com/Rylaispirit/cinematic-video-prompt-skill — references/02-lighting.md，80+ 光线术语；也列出了冲突组合（比如 golden hour 配暴雨）
2. hugodaddy822/cinematic-ai-lighting-skill ⭐1；prismprompt-hub/50-Best-Lighting-Prompts ⭐1；stayagreen/promptmanager ⭐0（电商光线提示词库）
提炼：
- 要真实手机感就不要电影光："flat overhead / available indoor light, not golden-hour window light"；"deep focus, NO bokeh"；"NOT cinematic, no color grade"（Kingsley-Cyber）
- UGC 默认平光中性光，加 2 个以上混合光源；室内不要拍到窗户（bchenner）
- "dim directional daylight entering from the left, back of the room in cool-toned shadow"（bchenner 示例）
- Window Light (soft & diffused)、Overcast/flat light（色彩真实）、Practical lighting（台灯/电视等画面内光源）（Rylaispirit）
- 内衣棚拍："key:fill 1.5:1, 4800K, large softbox"，低反差保住蕾丝细节（fsn021920）
- iPhone 视频质感："30fps (NOT 24), smart HDR flat tone with lifted shadows, neutral white balance, slight over-sharpening, digital stabilization micro-jitter, AF/AE breathing, front camera ~23mm held slightly below eye level"（Kingsley-Cyber）
