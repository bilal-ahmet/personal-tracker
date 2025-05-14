const db = require('../models');
const User = db.User;
const Goal = db.Goal;
const Progress = db.Progress;

// Login sayfası
exports.getLogin = (req, res) => {
  res.locals.error = req.query.error || null;
  res.render('auth/login', { title: 'Giriş Yap' });
};

// Login post
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.validPassword(password))) {
    return res.render('auth/login', { error: 'Hatalı email ya da şifre' });
  }

  req.session.user = user;
  res.redirect('/dashboard');
};

// Register sayfası
exports.getRegister = (req, res) => {
  res.render('auth/register', { title: 'Kayıt Ol', error: null });
};

// Register post
exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.render('auth/register', { error: 'Email zaten kullanılıyor' });
    }

    await User.create({ name, email, password });
    res.redirect('/login');
  } catch (err) {
    res.render('auth/register', { error: 'Kayıt sırasında bir hata oluştu' });
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('Deleting user and associated data for userId:', userId);

    // Delete associated progress records
    await Progress.destroy({
      where: { goalId: db.sequelize.literal(`(SELECT id FROM goals WHERE userId = ${userId})`) }
    });

    // Delete associated goals
    await Goal.destroy({ where: { userId } });

    // Delete the user
    await User.destroy({ where: { id: userId } });

    res.redirect('/login');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.redirect('/users');
  }
};
