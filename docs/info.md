# Used Items — Content Control

这是网站的内容控制文档。后续价格、状态、说明、配件或商品增删发生变化时，直接编辑这里并告诉我“同步 info”，我会把修改同步到网页、独立商品链接和分享信息。

状态只使用：`available`（可购买）、`reserved`（已预留）、`sold`（已售）。新图片放进当前 `materials/` 文件夹，并在对应商品的 `Image` 一栏填写文件名。

## Site notice

| Field | Value |
| --- | --- |
| Owner | Zayn |
| Availability | Through August 31, 2026 |
| Pickup | Bellevue Downtown, by arrangement |
| Delivery | Greater Seattle area, by arrangement |
| Phone | +1 206 617 8809 |
| Instagram | zhuaizige3008 |

## 01 — Martin D-X2

- Slug: `martin-d-x2-guitar`
- Status: `sold`
- Price: `$350`
- Summary: Acoustic guitar · 2021
- Description: A full-size Martin D-X2 acoustic guitar from 2021 with a warm sunburst finish.
- Condition: Used and in good working condition. Please inspect at pickup.
- Specs: Brand — Martin; Model — D-X2; Year — 2021; Finish — Sunburst
- Included: Guitar stand shown in the photo
- Image: `Martin-Guitar.PNG`

## 02 — Dell 4K Monitor

- Slug: `dell-4k-monitor`
- Status: `available`
- Price: `$100`
- Summary: 4K · 60 Hz
- Description: A clean, practical 4K Dell display for a desk, studio, or home-office setup.
- Condition: Used and functional. Screen condition can be checked in person.
- Specs: Resolution — 4K; Refresh rate — 60 Hz; USB — 2 × USB-A; Video — 1 × HDMI · 1 × DisplayPort
- Included: —
- Image: `Dell-Monitor.PNG`

## 03 — Gaming PC

- Slug: `rtx-3060ti-gaming-pc`
- Status: `reserved`
- Reservation note: Buyer committed; payment pending.
- Price: `$450`
- Summary: RTX 3060 Ti · Intel i7
- Description: A complete gaming and workstation tower with generous memory and mixed solid-state and hard-drive storage.
- Condition: Used and functional. Available to inspect and test by arrangement.
- Specs: GPU — NVIDIA RTX 3060 Ti; CPU — 12th-gen Intel Core i7; Memory — 32 GB DDR4; Storage — 1 TB SSD + 4 TB HDD
- Included: Wheeled PC stand shown in the photo; DisplayPort cable; HDMI cable
- Image: `PC.PNG`

## 04 — Omen Monitor

- Slug: `omen-2k-monitor`
- Status: `available`
- Price: `$150`
- Summary: 2K · 165 Hz
- Description: A high-refresh Omen gaming display with a minimal floating desk mount.
- Condition: Used and functional. Screen condition can be checked in person.
- Specs: Resolution — 2K; Refresh rate — 165 Hz; Mount — Floating monitor arm
- Included: Monitor arm at no additional cost
- Image: `Omen-Monitor.png`

## 05 — Gaming Chair

- Slug: `gaming-chair`
- Status: `available`
- Price: `Free`
- Summary: Black · magenta
- Description: A generously padded gaming chair with adjustable arms, back cushion, and headrest.
- Condition: Well used with visible wear. Free to a new home.
- Specs: Color — Black · magenta; Base — Five-wheel swivel; Support — Headrest + lumbar cushion
- Included: —
- Pickup note: Please make sure it will fit in your vehicle.
- Image: `Gaming-Chair.png`

## 06 — Clothes Basket

- Slug: `clothes-basket`
- Status: `available`
- Price: `Free`
- Summary: Soft-sided storage
- Description: A lightweight, neutral fabric basket for clothes, laundry, or everyday storage.
- Condition: Used and ready to take away.
- Specs: Material — Fabric; Color — Taupe · white; Format — Soft-sided
- Included: —
- Image: `Clothe-Bucket.png`

## 07 — Desk Lamp

- Slug: `desk-lamp`
- Status: `available`
- Price: `$5`
- Summary: LED task light
- Description: A slim black task lamp with a round weighted base and an adjustable light bar.
- Condition: Used and functional.
- Specs: Type — LED desk lamp; Color — Black; Control — Base-mounted button
- Included: —
- Image: `Desklamp.png`

## 08 — Floor Lamp

- Slug: `floor-lamp`
- Status: `available`
- Price: `$10`
- Summary: Black reading light
- Description: A tall, understated floor lamp with a flexible neck and a focused reading light.
- Condition: Used and functional.
- Specs: Type — Floor reading lamp; Color — Black; Head — Flexible neck
- Included: —
- Pickup note: Tall item; check vehicle clearance before pickup.
- Image: `Floor-Lamp.png`

## Adding or removing an item

- 添加：复制一个完整商品区块，分配新的唯一编号和 slug，并把原图放进 `materials/`。
- 删除：删除对应区块，或先把 Status 改成 `sold` 保留销售记录。
- 图片替换：保留旧图作备份，加入新文件，然后修改 Image 文件名。
- 修改后告诉我“同步 info”，网站代码不会在你保存文档的瞬间自动公开更改。
