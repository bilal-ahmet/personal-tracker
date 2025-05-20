const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const goalRoutes = require('./goalRoutes');
const progressRoutes = require('./progressRoutes');

router.use('/', authRoutes);
router.use('/goals', goalRoutes);
router.use('/progress', progressRoutes);

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('dashboard', { user: req.session.user });
});

module.exports = router;
