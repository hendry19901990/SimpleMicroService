var { Sequelize, DataTypes } = require('sequelize');
var db = require('../database');

var Messages = db.define('messages', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: Sequelize.STRING,
  createdAt:{ type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Messages;
