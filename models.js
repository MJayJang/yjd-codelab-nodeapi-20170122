// models.js
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  storage: 'db.sqlite',
  dialect: 'sqlite'
});

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: true
  }
});

module.exports = {sequelize, User};
