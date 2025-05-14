const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.User = require('./user.model')(sequelize, Sequelize);
db.Goal = require('./goal.model')(sequelize, Sequelize);
db.Progress = require('./progress.model')(sequelize, Sequelize);

// İlişkilendirmeler (örnek)
db.User.hasMany(db.Goal, { onDelete: 'CASCADE' });
db.Goal.belongsTo(db.User);

db.Goal.hasMany(db.Progress, { onDelete: 'CASCADE' });
db.Progress.belongsTo(db.Goal);

module.exports = db;
