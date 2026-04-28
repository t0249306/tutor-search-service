const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const tutorRoutes = require('./routes/tutors');
const reviewRoutes = require('./routes/reviews');
const bookingRoutes = require('./routes/bookings');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tutors', tutorRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});