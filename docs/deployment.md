# 部署草案

## 目标

- 域名：`used.chaostudio.org`
- 运行位置：Hetzner 1 号机
- 交付形式：Docker 容器
- 目标：部署简单、可重复、方便更新和回滚

## 初步结构

```text
Internet
   |
used.chaostudio.org
   |
HTTPS / reverse proxy
   |
website Docker container
```

流量由 Cloudflare 代理到服务器上的 Caddy，再通过内部 `app_net` 转发到 `used-website:3000`。

## 当前实现

- 网站源代码位于 `site/`
- 本地运行使用 `docker compose up --build -d`
- 生产运行使用 `docker compose -f compose.prod.yaml up -d --build`
- 生产容器仅加入外部 `app_net`，不向主机发布端口
- Caddy 将 `used.chaostudio.org` 反向代理到 `used-website:3000`
- 容器以内置的非 root 用户运行，并配置 HTTP 健康检查
- 原始素材保留在 `materials/`，网站使用的副本位于 `site/public/items/`

## 预计交付内容

- 网站源代码
- `Dockerfile`
- `.dockerignore`
- 容器运行所需的环境变量示例
- 健康检查
- 本地构建和运行说明
- 服务器部署与更新说明
- HTTPS 和域名 DNS 配置说明

## 已确认的生产环境

- Ubuntu 24.04，x86_64
- Docker Engine 与 Docker Compose 已安装
- Caddy 负责反向代理和源站 HTTPS
- Cloudflare 管理 DNS 和边缘 TLS
- 图片随容器部署，不需要对象存储或数据库
- 网站为无状态服务；恢复方式是从 GitHub 重新构建容器

## 基础安全原则

- 容器不以 root 用户运行
- 不把密码或密钥写入代码仓库
- 仅暴露必要端口
- 使用 HTTPS
- 为容器配置重启策略与健康检查
- 部署前固定生产依赖版本并完成基础漏洞检查
