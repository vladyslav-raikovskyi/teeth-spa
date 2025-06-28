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
    } catch (error) {
      console.log(`   ❌ Помилка читання файлу: ${error.message}`);
    }
  } else {
    console.log(`❌ ${file} - не існує`);
  }
});

console.log('\n📋 Поточна конфігурація:');
console.log('- Розробка: http://localhost:8000');
console.log('- Продакшн: https://your-production-api-url.com (потрібно оновити)');

console.log('\n💡 Для зміни URL API відредагуйте відповідні файли в src/environments/'); 