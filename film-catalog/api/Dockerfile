# ---------- Builder ----------
FROM node:22-alpine AS builder
WORKDIR /app

# Copia package.json + package-lock.json
COPY package*.json ./

# Instala dependências de produção
RUN npm ci --only=production

# Copia código-fonte
COPY src ./src

# ---------- Runner ----------
FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app

# instala curl e cria usuário não-root
RUN apk add --no-cache curl \
    && addgroup -S app && adduser -S app -G app

# Copia do builder
COPY --from=builder /app /app

# Troca para usuário não-root
USER app

EXPOSE 3000

# Healthcheck usando curl
HEALTHCHECK --interval=10s --timeout=5s --retries=5 CMD curl -f http://localhost:3000/healthz || exit 1

CMD ["node", "src/server.js"]
