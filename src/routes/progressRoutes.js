const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

router.get('/:goalId', progressController.viewProgress);
router.post('/:goalId', progressController.addProgress);
router.post('/delete/:goalId/:id', progressController.deleteProgress);

module.exports = router;
