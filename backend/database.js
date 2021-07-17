const { Sequelize } = require('sequelize');
 
const database = new Sequelize(process.env.DB_NAME || 'messages_db', process.env.DB_USER || 'root', process.env.DB_PASSWORD || 'test', {
    host:  process.env.DB_HOST || 'mysql_server',
    dialect: 'mysql'
  });

  database.sync()

  module.exports = database;
