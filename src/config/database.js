const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL bağlantısı başarılı.');
  } catch (error) {
    console.error('❌ Veritabanına bağlanılamadı:', error);
  }
})();

module.exports = sequelize;
