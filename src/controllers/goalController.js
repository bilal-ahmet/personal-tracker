const db = require('../models');
const Goal = db.Goal;
const Progress = db.Progress;

exports.listGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll({
      where: { userId: req.session.user.id },
      order: [['createdAt', 'DESC']] // Fixed order clause to use an existing column
    });
    res.render('goals/index', { title: 'Hedeflerim', goals });
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.render('goals/index', { title: 'Hedeflerim', goals: [], error: 'Hedefler yüklenirken bir hata oluştu.' });
  }
};

exports.newGoalForm = (req, res) => {
  res.render('goals/new', { title: 'Yeni Hedef Ekle' });
};

exports.createGoal = async (req, res) => {
  const { title, description, targetDate } = req.body;
  try {
    await Goal.create({
      title,
      description,
      targetDate,
      userId: req.session.user.id
    });
    res.redirect('/goals');
  } catch (error) {
    console.error('Error creating goal:', error);
    res.render('goals/new', { title: 'Yeni Hedef Ekle', error: 'Hedef oluşturulurken bir hata oluştu.' });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    console.log('Deleting goal and associated progress for goalId:', goalId);

    // Delete associated progress records
    await Progress.destroy({ where: { goalId } });

    // Delete the goal
    await Goal.destroy({ where: { id: goalId } });

    res.redirect('/goals');
  } catch (error) {
    console.error('Error deleting goal:', error);
    res.redirect('/goals');
  }
};
