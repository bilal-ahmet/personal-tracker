const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

router.get('/:goalId', progressController.viewProgress);
router.post('/:goalId', progressController.addProgress);

module.exports = router;
