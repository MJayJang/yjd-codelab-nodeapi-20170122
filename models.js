// models.js
const config = require('./config/env');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.db);

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: true
  }
});

module.exports = {sequelize, User};
