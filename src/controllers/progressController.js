const db = require('../models');
const Progress = db.Progress;
const Goal = db.Goal;

exports.viewProgress = async (req, res) => {
  try {
    const progressList = await Progress.findAll({
      where: { GoalId: req.params.goalId },
      order: [['date', 'DESC']]
    });
    res.render('progress/index', { progressList, goalId: req.params.goalId });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.render('progress/index', { progressList: [], goalId: req.params.goalId, error: 'İlerlemeler yüklenirken bir hata oluştu.' });
  }
};

exports.addProgress = async (req, res) => {
  const { date, progressAmount, note } = req.body;
  try {
    await Progress.create({
      date,
      progressAmount,
      note,
      GoalId: req.params.goalId
    });
    res.redirect(`/progress/${req.params.goalId}`);
  } catch (error) {
    console.error('Error adding progress:', error);
    res.render('progress/index', { progressList: [], goalId: req.params.goalId, error: 'İlerleme kaydedilirken bir hata oluştu.' });
  }
};

exports.deleteProgress = async (req, res) => {
  try {
    const progressId = req.params.id;
    console.log('Deleting progress with id:', progressId);

    // Delete the progress record
    await Progress.destroy({ where: { id: progressId } });

    res.redirect(`/progress/${req.params.goalId}`);
  } catch (error) {
    console.error('Error deleting progress:', error);
    res.redirect(`/progress/${req.params.goalId}`);
  }
};
