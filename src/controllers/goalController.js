const db = require('../models');
const Goal = db.Goal;

exports.listGoals = async (req, res) => {
  const goals = await Goal.findAll({ where: { userId: req.session.user.id } });
  res.render('goals/index', { goals });
};

exports.newGoalForm = (req, res) => {
  res.render('goals/new');
};

exports.createGoal = async (req, res) => {
  const { title, description, targetDate } = req.body;
  await Goal.create({
    title,
    description,
    targetDate,
    userId: req.session.user.id
  });
  res.redirect('/goals');
};
