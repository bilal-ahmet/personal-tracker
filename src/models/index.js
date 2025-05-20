const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./userModel')(sequelize, Sequelize);
db.Goal = require('./goalModel')(sequelize, Sequelize);
db.Progress = require('./progressModel')(sequelize, Sequelize);

// Relationships
db.User.hasMany(db.Goal, { onDelete: 'CASCADE' });
db.Goal.belongsTo(db.User); // Sequelize will automatically add the UserId column

db.Goal.hasMany(db.Progress, { onDelete: 'CASCADE' });
db.Progress.belongsTo(db.Goal); // Sequelize will automatically add the GoalId column

module.exports = db;
