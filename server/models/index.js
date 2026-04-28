const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tutor = sequelize.define('Tutor', {
  name: { type: DataTypes.STRING, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 }
});

const Review = sequelize.define('Review', {
  author: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false }
});

const Booking = sequelize.define('Booking', {
  studentName: { type: DataTypes.STRING, allowNull: false },
  contact: { type: DataTypes.STRING, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false }
});

Tutor.hasMany(Review);
Review.belongsTo(Tutor);

Tutor.hasMany(Booking);
Booking.belongsTo(Tutor);

module.exports = { sequelize, Tutor, Review, Booking };