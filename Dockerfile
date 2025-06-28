# Багатоетапна збірка для Angular додатку
# Етап 1: Збірка додатку
FROM node:22.16.0-alpine AS builder

ARG API_URL
ARG API_PASSWORD
# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо файли залежностей
COPY package*.json ./

# Встановлюємо залежності
RUN npm ci --only=production && npm cache clean --force

# Копіюємо вихідний код
COPY . .

RUN sed -i "s|API_URL_PLACEHOLDER|$API_URL|g" src/environments/environment.prod.ts
RUN sed -i "s|API_PASSWORD_PLACEHOLDER|$API_PASSWORD|g" src/environments/environment.prod.ts
RUN npm run build

# Етап 2: Продакшн сервер
FROM node:22.16.0-alpine AS production

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та server.js
COPY package*.json ./
COPY server.js ./

# Встановлюємо тільки продакшн залежності
RUN npm ci --only=production && npm cache clean --force

# Копіюємо зібраний додаток з етапу збірки
COPY --from=builder /app/dist ./dist

# Створюємо користувача для безпеки
RUN addgroup -g 1001 -S nodejs
RUN adduser -S angular -u 1001

# Змінюємо власника файлів
RUN chown -R angular:nodejs /app
USER angular

# Відкриваємо порт
EXPOSE 8080

# Встановлюємо змінні середовища
ENV NODE_ENV=production
ENV PORT=8080

# Запускаємо сервер
CMD ["node", "server.js"]
