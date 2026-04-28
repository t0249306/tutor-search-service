require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const tutorRoutes = require('./routes/tutors');
const reviewRoutes = require('./routes/reviews');
const bookingRoutes = require('./routes/bookings');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());
// Перенаправление на HTTPS в продакшене
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
});

app.use('/api/tutors', tutorRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/bookings', bookingRoutes);
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Фейковая проверка
  if (username === 'admin' && password === '12345') {
    // Вместо process.env.JWT_SECRET пишем любую строку чисто для теста
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Неверные данные');
  }
});

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});