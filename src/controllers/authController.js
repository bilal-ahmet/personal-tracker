const db = require('../models');
const User = db.User;

// Login sayfası
exports.getLogin = (req, res) => {
  res.render('auth/login', { error: null });
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
  res.render('auth/register', { error: null });
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
