module.exports = (sequelize, DataTypes) => {
  const Progress = sequelize.define('Progress', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    progressAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'progresses',
    timestamps: true
  });

  return Progress;
};
