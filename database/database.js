const sequelize = require('sequelize')

console.log('DB_HOST =', process.env.DB_HOST);
console.log('DB_NAME =', process.env.DB_NAME);
console.log('DB_USER =', process.env.DB_USER);
console.log('DB_PASSWORD =', process.env.DB_PASSWORD);
console.log('DB_PORT =', process.env.DB_PORT);

const connection = new sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  }
)

module.exports = connection;
