const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

router.get('/', goalController.listGoals);
router.get('/new', goalController.newGoalForm);
router.post('/new', goalController.createGoal);

module.exports = router;
