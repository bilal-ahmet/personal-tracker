const db = require('../models');
const Goal = db.Goal;
const Progress = db.Progress;

exports.listGoals = async (req, res) => {
  try {
    // Kullanıcıya ait tüm hedefleri çek
    const goals = await Goal.findAll({
      where: { UserId: req.session.user.id },
      order: [['createdAt', 'DESC']],
      attributes: {
        include: [
          [
            db.Sequelize.literal(`(
              SELECT COALESCE(SUM(progressAmount),0)
              FROM progresses
              WHERE progresses.GoalId = Goal.id
            )`),
            'totalProgress'
          ]
        ]
      }
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
    // Hedefi doğru kullanıcıya bağla
    await Goal.create({
      title,
      description,
      targetDate,
      UserId: req.session.user.id
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
    await Progress.destroy({ where: { GoalId: goalId } });
    await Goal.destroy({ where: { id: goalId } });
    res.redirect('/goals');
  } catch (error) {
    console.error('Error deleting goal:', error);
    res.redirect('/goals');
  }
};
