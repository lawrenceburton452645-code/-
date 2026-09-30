# Output Templates

Use only the template needed by the request. Fill fields with confirmed facts; mark unknowns instead of guessing.

## Product Contract

```text
SKU / listing:
Selected variant:
Exact category:
Included pieces and wearing relationship:
Listing-section provenance: highlights / detail fields / description / introduction, with confirmed / partial / blocked status:
Exact material/composition and evidence status:
Surface behavior under the identified light: sheen/matte response, texture, drape, fabric weight, stretch if confirmed:
Transparency and layering:
Confirmed colors and sizes:
Official sizing measurements or mapping (if listing-confirmed):
Model height (in) / weight (lb) / selected listing size:
Sizing status: listing-confirmed / internal AI casting reference
Front / side / back / detail locks:
Neckline / cups / straps / sleeves / waist / hem / trim locks:
Unknown or occluded details:
High-risk deformation and contact areas:
Must never become or gain:
Primary visible proof for this video or photo set:
```

## Chinese Storyboard

Use flexible shot count based on duration and real edits.

| Time | Shot / framing | Camera | Model, garment, prop, and cat action | Visible product state and proof | US environment and motivated light | Confirmed sound |
| --- | --- | --- | --- | --- | --- | --- |

Keep each action causal. For a high-risk action, specify start state, contact, path, end state, and the next-shot handoff.

## Final Generation Prompt

```text
Format and duration:
Adult person detail: age range, ethnicity, plus-size build/proportions, height (in), weight (lb), selected listing size, sizing status, face, hair, skin texture, makeup, expression, gaze, posture, body language, and starting hand/foot state:
Exact product lock:
Exact product material and appearance lock: composition, texture, sheen/matte response, drape, transparency, silhouette, pieces, wearing relationship, neckline/cups/straps/sleeves, waist/hem/trim, front/side/back appearance, and prohibited transformations; label unknown facts rather than guessing:
Detailed US background: location, layout/depth, furniture, surfaces, textiles, props, openings, color contrast, lived-in condition, and cat/prop starting positions:
Detailed motivated light: source, position, direction, quality, time of day, color character, falloff, shadows, catchlights, exposure response, and effect on skin and garment materials:
0-3 second hook:
Chronological action and camera timeline:
Primary visible proof:
Sound mode and any spoken American English:
Continuity locks:
Compact negative prompt:
```

## TikTok Shoppable Photo Prompt Set

Use 3-5 images. Default to four when the user does not specify a count. Keep clean image-generation prompts separate from post-production text.

```text
SKU / listing and selected variant:
Content type: 真人上身 / 真人+商品细节 / 商品展示 / 轻故事 / 中性状态对照
Image count and sequence:
Primary visible proof:
Same-model, product, room, and lighting lock:
Model height (in) / weight (lb) / selected listing size / sizing status:
Verified facts available for overlay copy:
Unconfirmed claims that must not appear:
```

For each image:

```text
图 1/2/3/4/5 - 本图职责：
画幅与构图：
成年模特与跨图连续性：年龄段、族裔、大码体型与比例、身高(in)、体重(lb)、所穿链接可售尺码、尺码数据性质、脸型、头发、真实皮肤、克制妆容、表情、视线、姿态和手脚状态：
商品精确锁定：
美国生活背景细节：地点、空间布局与纵深、家具、表面、织物、生活道具、门窗/阳台关系、色彩对比、生活痕迹、猫咪与道具位置：
光线细节：光源、位置、方向、软硬、时段、色彩倾向、衰减、阴影、眼神光、曝光响应，以及对皮肤和商品材质的具体影响：
姿态、手部和产品接触关系：
本图可见产品证明：
真实手机照片质感：
本图负面约束：
后期叠字文案（可选，不交给图像模型生成）：
```

Complete the set with:

```text
US-market post title (optional):
US-market post body (optional):
Verified hashtags (only when requested):
Carousel-wide negative prompt:
Product-fact and continuity checklist:
```

## Batch Variant Matrix

Change meaningful dimensions while keeping the product contract fixed:

| Variant | Hook | Location | Light | Camera height/path | Lifestyle action | Cat entrance/exit | Sound texture | Closing image |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

## QC Report

```text
Result: pass / targeted repair / fail
Product-fact check:
Wearing and physical-state check:
Person, room, camera, prop, and cat continuity:
Visible-proof check:
TikTok presentation check:
Required corrections:
```

For a photo carousel, replace the continuity line with: `跨图模特、商品、环境、光线和信息递进一致性` and check that every image adds distinct buying information.
