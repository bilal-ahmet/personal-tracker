module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define('Goal', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    targetDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'goals',
    timestamps: true
  });

  return Goal;
};
