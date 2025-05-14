const db = require('../models');
const Progress = db.Progress;

exports.viewProgress = async (req, res) => {
  const progressList = await Progress.findAll({
    where: { goalId: req.params.goalId },
    order: [['date', 'DESC']]
  });
  res.render('progress/index', { progressList, goalId: req.params.goalId });
};

exports.addProgress = async (req, res) => {
  const { date, progressAmount, note } = req.body;
  await Progress.create({
    date,
    progressAmount,
    note,
    goalId: req.params.goalId
  });
  res.redirect(`/progress/${req.params.goalId}`);
};
