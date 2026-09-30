# Sizing And AI Model-Fit Guide

Use TikTok Shop listing size information before every other sizing source.

## Authority

1. Listing size options, official size charts, garment measurements, and seller fit notes are authoritative.
2. If the listing provides bust, waist, hip, garment length, height, or weight mapping, preserve it exactly and use it before any project fallback.
3. The seven registered listings currently confirm available size labels but their accessible details do not expose an official height/weight map. Height/weight values below are internal AI casting references, not listing facts or customer purchase advice.
4. Height and weight alone cannot guarantee fit. Never turn an internal casting reference into an official size chart, overlay claim, spoken recommendation, or sales promise.
5. For US-market prompts, express model height in inches (`in`) and weight in pounds (`lb`); do not output metric units.

## Registered SKUs

| SKU | Listing-confirmed sizes | Default AI casting lock |
| --- | --- | --- |
| 001 | S, M, L, XL, 2XL, 3XL, 4XL, 5XL | 66 in, 220 lb, selected listing size 4XL |
| 033 | S, M, L, XL, 2XL | 66 in, 187 lb, selected listing size 2XL |
| 063 | S, M, L, XL, 2XL | 66 in, 187 lb, selected listing size 2XL |
| 045 | S, M, L, XL, 2XL | 66 in, 187 lb, selected listing size 2XL |
| 015 | XS, S, M, L, XL, 2XL, 3XL | 66 in, 187 lb, selected listing size 2XL |
| 056 | S, M, L, XL, 2XL | 66 in, 187 lb, selected listing size 2XL |
| 032 | S, M, L, XL, 2XL | 66 in, 187 lb, selected listing size 2XL |

## Internal Casting Bands

Use only when the listing lacks an official height/weight map and the generation prompt needs a concrete model/size relationship.

| Size | Height reference | Weight reference |
| --- | --- | --- |
| S | 59-65 in | 99-121 lb |
| M | 59-67 in | 116-138 lb |
| L | 61-69 in | 132-160 lb |
| XL | 61-69 in | 154-182 lb |
| 2XL | 61-71 in | 176-209 lb |
| 3XL | 61-71 in | 198-231 lb |
| 4XL | 61-73 in | 220-260 lb |
| 5XL | 61-73 in | 249-291 lb |

The overlap is deliberate because body proportions differ. Use these values to stabilize model build, garment scale, and cross-shot continuity, not to advise a real shopper.

## Prompt Contract

For every on-body video or photo prompt, include:

- model height and weight;
- the selected size, which must exist in the listing;
- whether the height/weight relationship is listing-confirmed or an internal AI casting reference;
- a fit lock: natural fit, no skin cutting, unsupported stretching, floating fabric, or transformation into another cut.

Default sentence for S-2XL listings:

`The adult plus-size model is approximately 66 in and 187 lb and wears listing-available size 2XL. Height and weight are an internal AI casting reference, not an official customer sizing claim.`

When the user supplies height, weight, or measurements, use their values and choose only from listing-available sizes. If fit cannot be confirmed from official measurements, state that limitation instead of promising suitability.
