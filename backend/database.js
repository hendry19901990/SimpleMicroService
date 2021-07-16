const { Sequelize } = require('sequelize');
 
const database = new Sequelize(process.env.DB_NAME || 'messages_db', process.env.DB_USER || 'root', process.env.DB_PASSWORD || 'test', {
    host: 'localhost',
    dialect: 'mysql'
  });

  database.sync()

  module.exports = database;

/*

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    start_date DATE
)  ENGINE=INNODB;
*/