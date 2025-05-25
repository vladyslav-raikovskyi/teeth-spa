# Етап збірки
FROM node:22.16.0-alpine as builder

WORKDIR /app

# Встановлюємо обмеження пам'яті для npm
ENV NODE_OPTIONS="--max-old-space-size=512"

# Копіюємо файли залежностей
COPY package*.json ./

# Встановлюємо залежності
RUN npm ci --production

# Копіюємо вихідний код
COPY . .

# Збираємо додаток
RUN npm run build

# Етап виконання
FROM nginx:alpine

# Копіюємо конфігурацію nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копіюємо зібраний додаток
COPY --from=builder /app/dist/teeth-spa/browser /usr/share/nginx/html

# Відкриваємо порт
EXPOSE 80

# Запускаємо nginx
CMD ["nginx", "-g", "daemon off;"] 