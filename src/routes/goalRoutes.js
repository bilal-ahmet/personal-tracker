const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

router.get('/', isAuthenticated, goalController.listGoals);
router.get('/new', isAuthenticated, goalController.newGoalForm);
router.post('/new', isAuthenticated, goalController.createGoal);

module.exports = router;
