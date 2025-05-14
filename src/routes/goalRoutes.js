const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', isAuthenticated, goalController.listGoals);
router.get('/new', isAuthenticated, goalController.newGoalForm);
router.post('/new', isAuthenticated, goalController.createGoal);
router.post('/delete/:id', isAuthenticated, goalController.deleteGoal);

module.exports = router;
