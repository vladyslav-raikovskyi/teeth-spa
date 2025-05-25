const express = require('express');
const path = require('path');
const app = express();

// Обслуговуємо статичні файли з папки dist
app.use(express.static(path.join(__dirname, 'dist/teeth-spa/browser')));

// Всі GET запити перенаправляємо на index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/teeth-spa/browser/index.html'));
});

// Визначаємо порт для Heroku
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 