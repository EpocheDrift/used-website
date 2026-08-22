# Zayn's Moving Sale

An editorial-style catalogue for Zayn's second-hand objects in Bellevue. Pickup availability runs through August 31, 2026. The site presents all items as one visual project and gives every object a shareable detail page.

## Project structure

- `site/` — website source and optimized public assets
- `materials/` — original item photos and source information
- `docs/` — product, content, and deployment notes
- `Dockerfile` and `compose.yaml` — self-hosted deployment

## Local development

```bash
cd site
npm install
npm run dev
```

The local site is available at `http://localhost:3000`.

## Production build

```bash
cd site
npm ci
npm run build
```

## Docker

From the repository root:

```bash
docker compose up --build -d
```

The local container listens on port `3000`.

Production runs at `https://used.chaostudio.org` on the Hetzner server. The production Compose file attaches the container only to the existing `app_net`; Caddy reaches it internally at `used-website:3000`, so the app does not publish a host port.

```bash
docker compose -f compose.prod.yaml up -d --build
```

## Updating an item

Edit `materials/info.md`, then ask Codex to “同步 info”. That document is the human-friendly source for prices, status, specifications, included accessories, images, and adding or removing items. Supported statuses are `available`, `reserved`, and `sold`.
