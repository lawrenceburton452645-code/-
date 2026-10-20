# AI 女装/内衣视频真实感指南（TikTok 带货用）

整合自 GitHub 公开仓库调研（2026-10-20）。英文短语可直接复制进提示词，括号里是中文注释。
每条技巧标注出处仓库；没有出处、是我们自己总结的标为 **【自行补充】**。完整仓库列表见 [repo_list.md](repo_list.md)。

出处简称：
- Kingsley = [Kingsley-Cyber/ai-video-movement-prompt-system](https://github.com/Kingsley-Cyber/ai-video-movement-prompt-system)
- bchenner = [bchenner/nanobanana-prompter](https://github.com/bchenner/nanobanana-prompter)
- open-ugc-kit = [anan235/open-ugc-kit](https://github.com/anan235/open-ugc-kit)
- junhao-ye = [junhao-ye/sns-realistic-portrait-prompt](https://github.com/junhao-ye/sns-realistic-portrait-prompt)
- Rylaispirit = [Rylaispirit/cinematic-video-prompt-skill](https://github.com/Rylaispirit/cinematic-video-prompt-skill)
- fsn = [fsn021920-prog/virtual-try-on-video](https://github.com/fsn021920-prog/virtual-try-on-video)
- cliprise = [cliprise/awesome-ai-ugc-video-prompts](https://github.com/cliprise/awesome-ai-ugc-video-prompts)

---

## 1 人物原生感（最重要）

### 1.1 皮肤纹理
- `fine visible pores on cheeks and nose`（脸颊和鼻子上可见的细毛孔）、`subtly uneven skin tone`（肤色轻微不均）、`faint fine lines`（淡细纹）、`slight under-eye puffiness`（轻微眼袋）、`light oil sheen only in the T-zone`（只有T区微油光）、`faint natural redness by the nose`（鼻翼旁自然泛红）—— 出处：Kingsley
- 定调句：`looks like an unfiltered real iPhone photo of real skin — the OPPOSITE of smooth AI skin`（像没滤镜的iPhone实拍真皮肤，和AI光滑皮肤相反）—— 出处：Kingsley
- **千万别写 `smooth skin`（光滑皮肤）**，它是蜡像/塑料脸的根源 —— 出处：Kingsley
- `Real skin, real rooms, real light — no beauty filter, no studio grade`（真皮肤、真房间、真光线，无美颜、无棚拍调色）—— 出处：open-ugc-kit

### 1.2 五官与脸
- 不写 `masterpiece / 8K / perfect face`（杰作/8K/完美脸）这类空词，改写可观察的细节 —— 出处：junhao-ye
- "自然优先于精致"：淡妆或素颜、`natural makeup, slightly asymmetrical features`（自然妆、五官轻微不对称）—— 规则出处 junhao-ye；英文短语【自行补充】

### 1.3 大码真实身材
- GitHub 上没有专门仓库。写法：`plus-size, soft natural curves, realistic body proportions, fabric creasing at the waist`（大码、柔和自然曲线、真实比例、腰部布料褶皱）；负向加 `slimmed body, distorted proportions`（被瘦身的身体、比例失真）—— 【自行补充】
- 补充可写：`natural belly and thigh shape, slight skin folds when bending`（自然的腹部和大腿形态、弯腰时皮肤轻微褶皱）—— 【自行补充】

### 1.4 微表情与表演
- `natural eye movement and small darts, gentle blinks, tiny brow flickers, soft cheek and lip micro-shifts, small head bobs; relaxed, never stiff or frozen`（自然眼动、轻眨眼、眉毛微动、脸颊嘴唇微动、小幅点头；放松，绝不僵硬定格）—— 出处：Kingsley
- 像跟朋友说话，不"表演"；一次侧瞥再看回镜头；小耸肩 —— 出处：Kingsley

### 1.5 头发和手
- 头发写具体状态：`loose and casual, tucked slightly into hoodie`（松散随意，微微塞进卫衣领）；可改成 `a few flyaway strands, hair tucked behind one ear`（几根碎发、一侧别在耳后）—— 示例出处 bchenner；改写【自行补充】
- 手入镜才写手部结构，不入镜不写；姿势要人能做到 —— 出处：junhao-ye
- 手部写法：`natural hands, five fingers, relaxed grip on phone, short natural nails`（自然的手、五指、轻握手机、短自然指甲）—— 【自行补充】

### 1.6 人物负面提示词
- `smooth_ai_skin, waxy_skin, poreless, airbrushed, uniform_skin_tone, plastic_skin, beauty_smoothing, frozen_stiff_face`（AI光滑皮肤、蜡质、无毛孔、喷枪磨皮、肤色过匀、塑料皮、美颜磨皮、僵脸）—— 出处：Kingsley
- 追加：`perfect symmetrical face, doll-like, uncanny, extra fingers, slimmed body`（完美对称脸、娃娃感、恐怖谷、多手指、瘦身）—— 【自行补充】

### 1.7 图生视频：首帧图决定一切
- 皮肤质感由首帧图决定，纹理必须先写进首帧图，视频提示词只管动作 —— 出处：Kingsley；open-ugc-kit（"Still first" 先出图）
- 首帧图就用全身构图、衣服完整遮盖（与第5节一致）—— 【自行补充】

---

## 2 手机实拍感 / 去 AI 感

- iPhone 视频参数：`30fps (NOT 24)`（30帧，不要电影24帧）、`smart HDR flat tone with lifted shadows`（智能HDR的平调、暗部提亮）、`neutral white balance`（中性白平衡）、`slight over-sharpening`（轻微过锐）、`digital stabilization micro-jitter`（电子防抖的微抖）、`AF/AE breathing`（对焦/曝光呼吸）、`front camera ~23mm held slightly below eye level`（前置约23mm，略低于眼睛持握）—— 出处：Kingsley
- `deep focus, NO bokeh`（全景深、无背景虚化）；`NOT cinematic, no color grade`（不要电影感、不调色）—— 出处：Kingsley
- 构图：偏心构图、手机支架式角度 —— 出处：bchenner
- `shot on iPhone, vertical 9:16, handheld mirror selfie, phone visible in mirror`（iPhone拍摄、竖屏、手持对镜自拍、镜中可见手机）—— 【自行补充】
- UGC 结构：Camera / Setting / Audio / CTA 四段写 —— 出处：cliprise
- 声音去 AI 感：加环境底噪、像 iPhone 收音 —— 出处：[dollaz-ai/ai-audio-mixer](https://github.com/dollaz-ai/ai-audio-mixer)
- 后期：加轻微噪点（grain）、略降清晰度、导出成手机常见码率（如 1080p H.264）、不加滤镜 —— 【自行补充】

---

## 3 美式真实背景

- `ordinary, slightly cluttered room (bathroom/bedroom) — not a styled set`（普通、略乱的卧室/浴室，不是布置好的样板间）—— 出处：Kingsley
- `narrative clutter`（有故事感的杂物）；示例 `minimalist apartment bedroom, mid-century modern wooden chair, framed art poster` —— 出处：bchenner
- `lived-in context`（有生活痕迹）—— 出处：junhao-ye
- `Setting: real home bathroom / bedroom with daylight` —— 出处：cliprise

美式具体元素（以下全部【自行补充】）：
- 公寓卧室：`beige wall-to-wall carpet, white popcorn ceiling, unmade queen bed with grey duvet, IKEA-style white dresser, phone charger cable on nightstand`（米色满铺地毯、白色颗粒天花板、没铺好的灰被子大床、宜家风白斗柜、床头柜上的充电线）
- 郊区卧室：`suburban bedroom, white baseboards, ceiling fan with light, window blinds`（郊区卧室、白踢脚线、带灯吊扇、百叶帘）
- 步入式衣帽间：`walk-in closet, wire shelving, clothes on plastic hangers, shoe boxes, Amazon packages on the floor`（步入式衣帽间、铁丝层架、塑料衣架、鞋盒、地上的亚马逊快递盒）
- 浴室镜子：`apartment bathroom mirror, vanity with beige countertop, toothbrush cup, towel on hook, slightly water-spotted mirror`（公寓浴室镜、米色台面洗手台、牙刷杯、挂钩毛巾、有水渍的镜子）
- 推拉镜门：`closet with sliding mirrored doors`（推拉镜面衣柜门，美国公寓常见，适合对镜自拍）
- 小道具：`Target bag, Stanley cup, scented candle, laundry basket`（Target购物袋、Stanley杯、香薰蜡烛、脏衣篮）

---

## 4 光线

- 手机感用 `flat overhead / available indoor light, not golden-hour window light`（顶灯平光/现有室内光，不要金色夕阳窗光）—— 出处：Kingsley
- UGC 默认平光中性光，混合 2 个以上光源；室内画面里不要拍到窗户 —— 出处：bchenner
- 示例：`dim directional daylight entering from the left, back of the room in cool-toned shadow`（左侧进来的弱方向日光，房间后部偏冷阴影）—— 出处：bchenner
- 术语：`window light (soft & diffused)`（柔和漫射窗光）、`overcast / flat light`（阴天平光，色彩真实）、`practical lighting`（画面内实际光源：台灯、电视、浴镜灯）—— 出处：Rylaispirit
- 避免冲突组合（如 golden hour 配暴雨）—— 出处：Rylaispirit
- 内衣细节棚拍：`key:fill 1.5:1, 4800K, large softbox`（主辅光比1.5:1、4800K、大柔光箱），低反差保住蕾丝细节 —— 出处：fsn（偏电商棚拍，非手机感）
- 色温：混合光写 `warm 3000K bedside lamp + cool daylight from off-frame`（3000K暖台灯 + 画外冷日光）；浴室写 `cool-white vanity light ~4000K`（约4000K冷白镜前灯）—— 【自行补充】

---

## 5 内衣合规防违规（TikTok 隐私部位暴露 / 色情）

GitHub 上**没有**专门讲内衣视频过 TikTok 审核的仓库。仓库来源只有：
- `professional e-commerce, not sexualized`（专业电商风，不性暗示）、`tasteful framing`（得体构图）；特写只拍蕾丝、扣件、侧翼拉伸；负向含 `inappropriate exposure`（不当暴露）—— 出处：fsn（references/category-lingerie.md）
- TikTok Shop 通用合规检查 —— 出处：[nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills)

以下规则来自 TikTok 政策（"不聚焦、不停留于私密部位"）和实际违规经验，均【自行补充】：
- 胸部完全覆盖：`full-coverage cups, chest fully covered`（全罩杯、胸部完全覆盖）
- 不用透视面料：`opaque fabric, lined lace, no sheer mesh`（不透明面料、有衬里蕾丝、无透视网纱）
- **第一帧就是全身**：`full-body shot from the first frame, camera at chest-to-eye height`（首帧全身、机位在胸到眼高度）；不要开场贴近胸部再后退
- 不拍私密部位特写，不在胸、臀、胯部停留
- 不加任何指向身体的箭头、圈、贴纸、文字
- 不用暗示性姿势：不弯腰对镜、不俯拍/仰拍低角度（`no low angle`）、不慢镜头抚摸身体
- 特写只给面料：`close-up only on lace pattern, fabric texture, hook-and-eye clasp, adjustable strap`（特写只拍蕾丝花纹、面料、背扣、肩带调节扣）
- 叠穿更安全：可外搭开衫/睡袍（`open cardigan / satin robe over the set`）
- 合规负面提示词：
  `sexualized, suggestive pose, cleavage focus, sheer, see-through, nipples, close-up of chest, close-up of buttocks, crotch, low angle, bending over, slow-motion body pan, arrows pointing at body, inappropriate exposure, nudity`

---

## 6 可直接复制的模板块

### 6.1 人物锁定（Person lock）
```
人物：真实的美国大码女性，30岁左右，淡妆，自然表情
A real American plus-size woman, around 30, light natural makeup, relaxed candid expression.
Skin: fine visible pores on cheeks and nose, subtly uneven skin tone, light oil sheen only in the T-zone, faint natural redness by the nose.
Body: plus-size, soft natural curves, realistic body proportions, fabric creasing at the waist.
Hair: loose and casual, a few flyaway strands, tucked behind one ear.
Hands: natural hands, five fingers, relaxed grip on phone.
Micro-motion: natural eye movement, gentle blinks, tiny brow flickers, small head bobs; relaxed, never stiff.
Looks like an unfiltered real iPhone photo of real skin.
```

### 6.2 场景（Scene）
```
场景：美国公寓卧室，生活感，略乱
Ordinary lived-in American apartment bedroom, not a styled set: beige carpet, white popcorn ceiling, closet with sliding mirrored doors, unmade queen bed with grey duvet, IKEA-style dresser, laundry basket, phone charger on nightstand.
```

### 6.3 光线（Light）
```
光线：室内现有平光 + 混合光源，画面内不出现窗户
Flat available indoor light from the ceiling fixture, mixed with a warm 3000K bedside lamp; soft cool daylight from off-frame left; no window visible in frame; neutral white balance; not golden hour.
```

### 6.4 镜头（Camera）
```
镜头：iPhone 竖屏对镜自拍，首帧全身
Shot on iPhone, vertical 9:16, 30fps, handheld mirror selfie, phone visible in mirror, full-body shot from the first frame, camera at chest-to-eye height, slight handheld micro-jitter, deep focus, no bokeh, not cinematic, no color grade.
Close-ups only on lace pattern, fabric texture, clasps and straps.
```

### 6.5 负面提示词（Negative prompt）
```
smooth_ai_skin, waxy_skin, poreless, airbrushed, uniform_skin_tone, plastic_skin, beauty_smoothing, frozen_stiff_face, perfect symmetrical face, doll-like, uncanny, extra fingers, slimmed body, distorted proportions, studio lighting, cinematic, bokeh, color grade, slow motion, golden hour, masterpiece, 8K,
sexualized, suggestive pose, cleavage focus, sheer, see-through, close-up of chest, close-up of buttocks, crotch, low angle, bending over, arrows pointing at body, inappropriate exposure, nudity
```

---

## 7 参考仓库清单

**人物原生感**
- [Kingsley-Cyber/ai-video-movement-prompt-system](https://github.com/Kingsley-Cyber/ai-video-movement-prompt-system) —— 最实用，iPhone UGC 预设、反AI皮肤、面部微动作
- [bchenner/nanobanana-prompter](https://github.com/bchenner/nanobanana-prompter) —— 写实UGC图片手册，含对镜自拍示例
- [anan235/open-ugc-kit](https://github.com/anan235/open-ugc-kit) —— 209条 Seedance 写实UGC提示词（CC BY 4.0）
- [junhao-ye/sns-realistic-portrait-prompt](https://github.com/junhao-ye/sns-realistic-portrait-prompt) —— 日常手机感人像，"自然优先于精致"
- [LunarXuan/natural-sns-portrait](https://github.com/LunarXuan/natural-sns-portrait) —— 中文日常手机人像 Skill
- [GitHub30/Reproducible-Photorealistic-Nano-Banana-Pro-JSON-Prompts](https://github.com/GitHub30/Reproducible-Photorealistic-Nano-Banana-Pro-JSON-Prompts) —— 可复现写实人像 JSON
- [xTreeRoot/visual-prompt-atlas-prompt-json](https://github.com/xTreeRoot/visual-prompt-atlas-prompt-json) —— 从真实视频蒸馏的动作/表情/背景库
- [dollaz-ai/ai-audio-mixer](https://github.com/dollaz-ai/ai-audio-mixer) —— 声音去AI感

**内衣与合规**
- [fsn021920-prog/virtual-try-on-video](https://github.com/fsn021920-prog/virtual-try-on-video) —— 唯一有内衣专章（category-lingerie.md）
- [nexscope-ai/eCommerce-Skills](https://github.com/nexscope-ai/eCommerce-Skills) —— TikTok Shop 通用合规检查
- [xixihhhh/clipforge](https://github.com/xixihhhh/clipforge) —— 带货视频工具，含广告合规检测
- [kezd088/100x-skill-tiktok](https://github.com/kezd088/100x-skill-tiktok) —— 保守合规档
- [muzi-lc/lingerie-creator-video-analysis-skill](https://github.com/muzi-lc/lingerie-creator-video-analysis-skill) —— 内衣达人视频分析（未能打开核实）

**光线**
- [Rylaispirit/cinematic-video-prompt-skill](https://github.com/Rylaispirit/cinematic-video-prompt-skill) —— 80+ 光线术语（references/02-lighting.md）

**视频提示词库 / 带货脚本**
- [renoise-ai/awesome-seedance-prompts](https://github.com/renoise-ai/awesome-seedance-prompts) —— 290+ Seedance，穿搭多
- [cliprise/awesome-ai-fashion-video-prompts](https://github.com/cliprise/awesome-ai-fashion-video-prompts) —— 服装广告/试穿模板
- [cliprise/awesome-ai-ugc-video-prompts](https://github.com/cliprise/awesome-ai-ugc-video-prompts) —— UGC 结构模板
- [xigua0626/tiktok-ugc-seedance](https://github.com/xigua0626/tiktok-ugc-seedance) —— 商品+参考视频→UGC脚本
- [xianyu110/ecommerce-video-skills](https://github.com/xianyu110/ecommerce-video-skills) —— 3秒钩子、分镜、图生视频

**中文资源**
- [Susanzz101/Susan-AI-Video-Prompt-skill](https://github.com/Susanzz101/Susan-AI-Video-Prompt-skill) —— 服装展示、口播、视频反推
- [binghe1980/ecommerce-video-prompts](https://github.com/binghe1980/ecommerce-video-prompts) —— 电商视频提示词工作台
- [ai-fzx/fzx_daihuo_prompt_skill](https://github.com/ai-fzx/fzx_daihuo_prompt_skill) —— 图片→带货提示词

更多（50+ 个）见 [repo_list.md](repo_list.md)。
