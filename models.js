// models.js
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  storage: 'db.sqlite',
  dialect: 'sqlite'
});

const User = sequelize.define('user', {
  name: Sequelize.STRING
});

module.exports = {sequelize, User};
