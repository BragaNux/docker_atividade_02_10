# 🎬 Mini‑plataforma “Catálogo de Filmes”


API Node.js + Postgres + Frontend (Nginx) + Observabilidade (Prometheus + cAdvisor + Grafana) + CI (GHCR).


## 1) Requisitos
- Docker 24+
- Docker Compose v2+


## 2) Configuração
1. Copie `.env.example` para `.env` e ajuste se necessário.
2. (Opcional) Ajuste `monitoring/prometheus.yml` e painéis de Grafana.


## 3) Subir tudo
```bash

docker compose up -d --build
