const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db_site.db',
  logging: false
});

module.exports = sequelize;