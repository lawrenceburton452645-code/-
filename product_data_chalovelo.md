# CHALOVELO 对标产品资料

资料更新时间：2026-09-21  
用途：为 033、063、045、015、056、032 这几个产品建立 TikTok Shop 链接主导的产品资料，补充材质、结构、颜色、尺码、卖点和视频提示词可用细节。

## 资料使用原则

- 用户提供的 TikTok Shop/CHALOVELO 商品链接是产品款式、材质、件数组成、颜色名、尺码、护理方式和商品标题的最高优先级。
- 本地图片主要用于识别编号、辅助理解视觉方向和生成画面参考；如果页面信息和本地图片不一致，以商品链接页面为准。
- 模特上身图只用于参考穿着效果、体型、肤色、比例和镜头呈现，不用于覆盖商品链接里的款式、材质、件数、颜色和尺码信息。
- 生成视频提示词时，可以用本地图片辅助描述视觉质感，但不得覆盖链接页面中的真实商品结构和材质。
- 对应关系分为：`确认/高相似/仅材质参考/未确认`。不要把“仅材质参考”的页面当成同款商品。

## 尺码与 AI 模特选码

- 商品链接的尺码选项和官方尺码表优先于其他资料。当前页面确认：033、063、045、056、032 为 S/M/L/XL/2XL；015 的变体选择器为 XS/S/M/L/XL/2XL/3XL。
- 当前可访问商品详情未显示官方身高体重对应表。完整的内部造型参考见 `product_sizing_guide_chalovelo.md`；其中身高体重区间不是商品页事实，也不能作为消费者购买建议。
- 默认提示词设定：六款均使用约 66 in、187 lb、链接可售 2XL。面向美国市场只使用英寸和磅，并且每次必须注明这是 AI 模特造型参考，除非链接后续提供官方映射。
- 生成真人上身提示词时必须同时写模特身高、体重、所穿尺码和数据性质，并要求服装自然合身、不勒入皮肤、不悬空、不被拉伸成另一种剪裁。

## CHALOVELO 店铺信息

- 店铺链接：https://shop.tiktok.com/us/store/chalovelo/7494165899525326509
- 店铺页可见数据：约 2.5K+ 粉丝、9509 已售出、33 视频数。
- 店铺页可见服务数据：4.6 店铺评分、86% 好评、99% 按时送达率、87% 聊天满意度。

## 商品页四栏目读取状态（2026-09-23）

- 033、063、045、015、056、032 六款链接均已在浏览器中打开并读取“精彩片段、详细信息、商品描述、简介”。六款均不缺链接。
- `精彩片段`与`简介`在这些页面上均标记为 TikTok AI generated，作为兼容性营销摘要保存，不能覆盖结构化`详细信息`或商品图片。
- 多数`商品描述`主要由商品图片组成；只有 015 暴露了可读取的卖家正文。图片型描述不被伪写成文字事实。
- 每款的完整栏目、证据状态和提示词商品合同见 `product-library.json` 的 `listing_sections` 与 `prompt_product_contract`。

## 056

本地参考图：

- `E:\下载\图片素材\056正面无裤头白底图.png`
- `E:\下载\图片素材\056背面.png`

本地图片确认的产品外观：

- 黑色缎面感两件套/三件套风格。
- 上衣是细肩带短款吊带，胸前为三角罩杯或深 V 结构，下摆有荷叶边。
- 下装为同色缎面感短裤或内裤，腰口/裤口带荷叶边。
- 面料表面光滑、有轻微反光，视觉上更接近 satin/缎面，而不是纯蕾丝。
- 整体是轻便睡衣/居家内衣方向，视觉卖点是柔软、顺滑、荷叶边、年轻甜美。

TikTok Shop 对标链接：

- https://shop.tiktok.com/us/pdp/chalovelo-satin-pajama-set-for-women-3-piece-sleepwear/1732460699708986029
- 对应关系：确认用于 056 的材质和结构参考；与本地 056 高相似。

CHALOVELO 页面资料摘录：

- 标题：CHALOVELO Women's Soft Satin 3 Piece Set Lingerie - Basic Camisole Top, Shorts for Lounging, Ruffle Charm Sleepwear...
- 结构：3 件套，包括 camisole top、shorts、bikini-style panties。
- 材质：soft satin material / satin；页面详细信息里 Material 显示为 `Stain`，应按语境理解为 satin/缎面。
- 尺码：S、M、L、XL、2XL。
- 颜色选择器：Red、Green、Burgundy、Pink、Black。Red 与 Green 是新增圣诞印花款；红/深绿色缎面底上有白色圣诞树、礼盒和雪花状重复图案，不是纯色。
- 卖点：soft、lightweight、smooth texture、comfortable、daily lounging、flattering fit。
- 页面可见销量：已售 73。
- 页面评价信息：评价提到 satin fabric soft、lightweight、comfortable、looks like pictures、color gorgeous。

后续视频提示词可用产品词：

- 黑色柔软缎面感吊带睡衣套装。
- 细肩带短款上衣、三角罩杯、下摆荷叶边。
- 同色荷叶边短裤/内裤，轻微光泽，布料随动作有柔软摆动。
- 展示重点：缎面光泽、荷叶边层次、上衣下摆和短裤边缘的柔软动感。
- 圣诞款必须额外锁定：红色或深绿色底、白色重复圣诞树/礼盒/雪花状图案，上衣与短裤图案一致，沿用同一细肩带深 V、荷叶下摆和荷叶短裤版型。

注意：

- 不要把 056 写成长款睡袍，也不要加入蕾丝长袍、丝袜、颈饰等本地图没有的配件。

## 015

本地参考图：

- `E:\下载\图片素材\015-白底图.jpg`
- `E:\下载\图片素材\015白.png`
- `E:\下载\图片素材\015白色.png`
- `E:\下载\图片素材\015粉.png`
- `E:\下载\图片素材\015红.png`
- `E:\下载\图片素材\015酒红色.png`

本地图片确认的产品外观：

- 透明蕾丝长开衫/睡袍 + 内搭连体或分体情趣内衣 + 吊袜/长袜视觉组合。
- 外袍为长款透明蕾丝，长袖，边缘垂坠，正面开襟。
- 内搭有罩杯、腰部竖向拼接和吊袜带结构。
- 颜色已确认：白、粉、红、酒红；另有黑色版本可从 CHALOVELO 页面参考，但本地 015 当前未见黑色独立图。

TikTok Shop 对标链接 1：

- https://shop.tiktok.com/us/pdp/lace-four-piece-lingerie-set-seductive-nightwear-robe-teddy-mesh-stockings/1732308319763468973
- 对应关系：确认/高相似，对应 015 的“蕾丝睡袍 + teddy/内搭 + stockings”结构。

页面资料摘录：

- 标题：CHALOVELO Lace 4-Piece Lingerie Set - Sexy Lace Corset and Panty Exotic Babydoll Sleepwear Robe with Garter Belt & Stockings...
- 结构：4 件套，页面描述包含 robe、lace teddy、tank top、thong、mesh stockings。
- 材质：intricate lace detailing、sheer mesh stockings、delicate lace and sheer mesh。
- 尺码：页面精彩片段写 S、M、L、XL、2XL；当前变体选择器实际显示 XS、S、M、L、XL、2XL、3XL，生成提示词以选择器为准。
- 颜色：当前变体选择器显示 Black、White、Red、BurgundyR、Pink、Brown、PurPle。
- 页面可见表现：4.8 评分、28 条评价、已售 434；店铺页首屏曾显示 $28.99、-40%。
- 页面评价关键词：Fabric & Comfort Good、Fit & Size Good、Quality Good。

TikTok Shop 对标链接 2：

- https://shop.tiktok.com/us/pdp/plus-size-soft-mesh-teddy-nightgown-set-womens-sleepwear/1732305238796440237
- 对应关系：同类补充参考，适合补充 plus-size、soft mesh、更多颜色和尺码信息；不是严格同款。

页面资料摘录：

- 结构：soft mesh teddy bodysuit、ruffle mesh babydoll nightgown、lace corset、stockings。
- 材质：soft, breathable mesh material。
- 尺码：M、L、XL、2XL、3XL、4XL、5XL。
- 颜色：red、white、pink、black、dark green、navy blue、black+dark green。
- 页面可见销量：已售 182。

后续视频提示词可用产品词：

- 透明蕾丝长款开衫睡袍。
- 蕾丝罩杯内搭、竖向腰部拼接、吊袜带结构、网纱/蕾丝长袜。
- 外袍袖口和下摆自然垂落，透出内搭轮廓。
- 展示重点：外袍透明蕾丝纹理、长袖垂感、内搭结构、吊袜带连接位置。

注意：

- 015 的重点是层次感和透明蕾丝，不要写成单件 babydoll 小裙或普通睡裙。

## 045

本地参考图：

- `E:\下载\图片素材\045-白.png`
- `E:\下载\图片素材\045-黑.png`
- `E:\下载\图片素材\045-红.png`

本地图片确认的产品外观：

- 蕾丝拼接小裙摆款，带颈饰/choker 元素。
- 上半身为有罩杯结构的蕾丝/网纱连体视觉，下摆为短款薄纱裙摆。
- 黑色、白色、红色版本已确认。
- 本地图中黑色款带黑色颈饰，红色款带红色颈饰；白色款可见白色颈部配件。

TikTok Shop 主链接：

- https://shop.tiktok.com/us/pdp/chalovelo-womens-sexy-underwire-lingerie-set-sheer-stretch/1732538334839804589
- 对应关系：确认。页面图片与本地 045 的蝴蝶结 choker、钢圈蕾丝罩杯、半透明蕾丝腰身和短网纱裙摆高度一致，作为当前最高优先级链接。

页面资料摘录：

- 标题：CHALOVELO Women's Sexy Underwire Lingerie Set - Polyester Mix Babydoll Dress, Thong, Choker, Deep V-Neck, Lace Trim, Sheer, Stretch。
- 结构：3 件协调关系为蝴蝶结 choker、带钢圈深 V 蕾丝 babydoll 短裙、配套 thong；当前主链接不含丝袜。
- 材质：95% Polyester、5% Elastane；花卉蕾丝罩杯/腰身和半透明短网纱裙摆。
- 尺码：S、M、L、XL、2XL。
- 颜色：Black、White、Burgundy。
- 护理：Dry clean 或 Cold wash。

后续视频提示词可用产品词：

- 蕾丝 choker 颈饰。
- 深 V 钢圈花卉蕾丝罩杯、贴身蕾丝腰身和配套 thong。
- 短款蓬松薄纱裙摆，轻微透明，边缘柔软。
- 展示重点：颈饰、罩杯蕾丝纹理、腰身拼接、小裙摆的层次和飘动。

注意：

- 045 不要写成长睡袍，不要加入丝袜，不要省略 choker、钢圈罩杯、配套 thong 或短网纱裙摆。

旧链接 `1732307950070043309` 仅保留为历史相似款参考；它的 matching stockings 与 S-5XL 不得再写入 045 当前提示词。

## 033

本地参考图：

- `E:\下载\图片素材\@033-产品图.png`
- `E:\下载\图片素材\033-产品背图.jpg`
- `E:\下载\图片素材\033正面图.png`
- `E:\下载\图片素材\033上身_1.png`
- `E:\下载\图片素材\033上身1.png`
- `E:\下载\图片素材\i0331.png`
- `E:\下载\图片素材\把@@033-产品图 的产品改色为@80 (1)-record-3838694-0.png`
- `E:\下载\图片素材\把@033-产品背图 (1) 的产品改色为@80 (1)-record-3838720-0.png`

本地图片确认的产品外观：

- 修身吊带短裙/chemise，黑色版本为主，另有红色改色图。
- 正面有细肩带、V 形或弧形胸部线条；按商品链接优先，胸部和裙身为半透明黑色蕾丝，花卉纹理与肌肤形成可读但得体的层次。
- 下摆有蕾丝波浪边。
- 背面为较开放的蕾丝后背结构，可见横向背带/肩带连接，裙身后片保持与正面一致的半透明黑色蕾丝和花卉纹理。
- 版型贴身，长度约大腿上方，整体更像 lace chemise/mini nightdress，不是分体套装。

TikTok Shop 对标链接 1：

- https://shop.tiktok.com/us/pdp/chalovelo-womens-sexy-nightgown-lace-babydoll-chemise/1732460667220169389
- 对应关系：确认对应 033。用户已确认该链接为 033 的 TikTok Shop 商品页；页面标题中的 `Sheer Lace` 以及 lace chemise、adjustable straps、lace back design 是 033 的优先材质和结构事实。当前用户已明确要求恢复链接描述，033 按半透明蕾丝处理。

页面资料摘录：

- 标题：CHALOVELO Women's Elegant Sheer Lace Babydoll Chemise - Casual Basic Nightgown Sleepwear with Adjustable Straps。
- 材质：Lace；页面细节里 Material 为 Lace，Embellishment 为 Lace。
- 结构：adjustable straps、lace back design；材质透明度按标题 `Sheer Lace` 处理为半透明蕾丝。
- 尺码：S、M、L、XL、2XL。
- 颜色：black、red。
- 页面可见销量：已售 29。

TikTok Shop 对标链接 2：

- https://shop.tiktok.com/us/pdp/chalovelo-womens-2-piece-lacy-babydoll-chemise-set-v-neck-sheer/1732470377303675565
- 对应关系：仅材质/卖点参考。该页面是两件套 babydoll dress + lace panty，和 033 的单件裙不完全一致。

页面资料摘录：

- 结构：1 babydoll dress + 1 lace panty。
- 材质：95% polyester、5% elastane；soft stretch fabric。
- 设计：V-neck lace top、sheer mesh skirt、front split、ruffle hem。
- 尺码：S、M、L、XL、2XL。
- 颜色：Burgundy、Black、White。
- 护理：hand wash only。
- 页面可见销量：已售 27。

后续视频提示词可用产品词：

- 黑色贴身蕾丝吊带 chemise/mini nightdress。
- 半透明黑色花卉蕾丝裙身、细肩带、蕾丝波浪下摆、开放式蕾丝背部结构。
- 展示重点：前后结构、背部横带、半透明蕾丝与肌肤形成的层次、花卉纹理和下摆波浪边。

注意：

- 不要把 033 写成两件套；若需要红色版本，只能根据本地改色图写，不要混入 CHALOVELO 的其他红色款结构。
- 033 必须保留链接确认的半透明蕾丝质感，不得改写为完全不透明布料；同时保持得体穿着、正常正面或三分之四构图，避免走光、极端高透明、身体局部特写或色情化视角。

## 032

本地参考图：

- `E:\下载\图片素材\032-白.png`
- `E:\下载\图片素材\032-黑.png`
- `E:\下载\图片素材\032-红.png`

本地图片确认的产品外观：

- 两件套蕾丝内衣：短款蕾丝文胸/bralette + 蕾丝短裤。
- 上衣为细肩带、三角或软杯蕾丝罩杯，胸下有较宽蕾丝下摆。
- 下装为同色高腰或中腰蕾丝短裤，边缘为花边/波浪蕾丝。
- 颜色已确认：白、黑、红。
- 整体透明度较高，重点是蕾丝花纹、成套感和短裤边缘。

TikTok Shop 对标链接：

- https://shop.tiktok.com/us/pdp/chalovelo-womens-lace-lingerie-set-floral-bra-and-comfortable-sleepwear/1732537217568903853
- 对应关系：确认归入 032。该页面为用户提供的 032 对应链接；页面中的 floral lace、camisole/bra/panty、polyester + elastane、颜色、尺码和护理方式是 032 的优先产品事实。

页面资料摘录：

- 标题：CHALOVELO Women's 3-Piece Lace Lingerie Set - Basic, Sexy Chic Babydoll Cut Camisole Bra, Panty, Seamless Fit Shorts, V-Neck Sleepwear Underwear (Blush Pink)。
- 材质：95% Polyester、5% Elastane；页面详细信息同时标注 Material Lace。
- 结构：3 件套，页面写为 camisole、bra、panty；标题中包含 seamless fit shorts。后续提示词按链接页面的 3-piece lace lingerie set 处理。
- 颜色：Red、Pink、White、Black。
- 尺码：S、M、L、XL、2XL。
- 护理：Machine washable。
- 页面可见销量：已售 6。

旧参考链接：

- https://shop.tiktok.com/us/pdp/chalovelo-womens-3-piece-lingerie-set-halter-bra-panties/1732464692405179053
- 状态：仅市场参考，不作为 032 同款。该页面含 halter bra、heart chains、garter belt，和本地 032 差异较大。

后续视频提示词可用产品词：

- 两件式蕾丝 bralette 和蕾丝短裤。
- 细肩带、软杯蕾丝罩杯、较宽蕾丝胸下围。
- 同色蕾丝短裤，花边裤脚和腰口。
- 展示重点：成套颜色统一、蕾丝透明花纹、短裤边缘、上衣下围。

注意：

- 不要加入 halter 颈挂、心形链条、吊袜带。032 按用户提供链接里的 3 件套结构处理，不再按旧参考链接或本地图限制为两件套。

## 063

本地参考图：

- `E:\下载\图片素材\063-黑.jpg`
- `E:\下载\图片素材\063-蓝.png`
- `E:\下载\图片素材\063-香槟.png`

本地图片确认的产品外观：

- 缎面吊带睡裙 + 长款睡袍套装。
- 内搭为缎面吊带裙，胸口有蕾丝装饰，裙身顺滑、有光泽。
- 外袍为同色长款睡袍，长袖，袖口和下摆带蕾丝边。
- 颜色已确认：黑、深蓝、香槟粉/浅香槟。
- 结构更偏 elegant satin robe set / nightgown robe set，不是短裤套装。

TikTok Shop 对标链接：

- https://shop.tiktok.com/us/pdp/chalovelo-womens-nightdresses-sleeveless-2-piece-set-soho-chic/1732627755632530093
- 对应关系：确认归入 063。该页面为用户提供的 063 对应链接；页面颜色 black、champagne、navy blue 与本地 063 图片一致。页面文字中的 sleeveless/basic 2-piece nightdress、polyester、颜色和尺码是 063 的优先产品事实。

页面资料摘录：

- 标题：CHALOVELO Women's Nightdresses - Womenswear Homewear Sleepwear & Loungewear for Casual Relaxation Sleeveless Basic Minimalist 2-piece set,sohochic。
- 材质：Polyester。
- 袖长字段：Sleeveless。
- 结构：2-piece set / nightdress / sleepwear & loungewear。
- 颜色：black、champagne、navy blue。
- 尺码：S、M、L、XL、2XL。
- 页面可见销量：已售 1。

可借用的材质词：

- polyester、smooth texture、lightweight、silky sheen、lace trim。

后续视频提示词可用产品词：

- sleeveless/basic 2-piece nightdress set，偏家居睡衣和休闲睡裙方向。
- 黑色、香槟色、深蓝色基础极简款，材质按页面记录为 polyester。
- 展示重点：简洁吊带/无袖轮廓、顺滑面料表面、居家放松场景中的自然垂坠。

注意：

- 不要把 063 写成 camisole + shorts + panties 的短款三件套；那是 056 链接的结构。
- 不要再强制加入长袖睡袍、袖口蕾丝或长袍下摆，除非用户后续指定要用本地图片版本做视觉变体。

## 后续待补充

- 若用户提供更多链接，按本文件格式追加到对应编号。
