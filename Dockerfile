FROM node:22-alpine AS build

WORKDIR /app

COPY site/package.json site/package-lock.json ./
RUN npm ci

COPY site/ ./
RUN npm run build

FROM node:22-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

RUN addgroup --system --gid 1001 klstudio \
  && adduser --system --uid 1001 --ingroup klstudio klstudio

COPY --from=build --chown=klstudio:klstudio /app/dist/standalone ./
COPY --from=build --chown=klstudio:klstudio /app/node_modules/react ./node_modules/react
COPY --from=build --chown=klstudio:klstudio /app/node_modules/react-dom ./node_modules/react-dom
COPY --from=build --chown=klstudio:klstudio /app/node_modules/scheduler ./node_modules/scheduler

USER klstudio
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["node", "server.js"]
