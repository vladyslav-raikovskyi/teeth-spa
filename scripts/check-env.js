#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Перевірка конфігурації середовища...\n');

// Перевірка файлів середовища
const envFiles = [
  'src/environments/environment.ts',
  'src/environments/environment.development.ts',
  'src/environments/environment.prod.ts'
];

envFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - існує`);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('apiUrl')) {
        console.log(`   📡 apiUrl знайдено`);
      } else {
        console.log(`   ⚠️  apiUrl не знайдено`);
      }
      if (content.includes('apiPassword')) {
        console.log(`   🔐 apiPassword знайдено`);
      } else {
        console.log(`   ⚠️  apiPassword не знайдено`);
      }
    } catch (error) {
      console.log(`   ❌ Помилка читання файлу: ${error.message}`);
    }
  } else {
    console.log(`❌ ${file} - не існує`);
  }
});

console.log('\n📋 Поточна конфігурація:');
console.log('- Розробка: http://localhost:8000');
console.log('- Продакшн: використовує змінні середовища API_URL та API_PASSWORD');

console.log('\n🔧 Змінні середовища для Railway:');
console.log('- API_URL: URL вашого API сервера');
console.log('- API_PASSWORD: пароль для авторизації API (опціонально)');
console.log('- NODE_ENV: production');
console.log('- PORT: 8080');

console.log('\n💡 Для зміни URL API або пароля встановіть змінні середовища в Railway Dashboard'); 