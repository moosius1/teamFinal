const express = require('express');
const router = express.Router();

const validation = require('../middleware/validate');

const moodsController = require('../controllers/moodsController');

router.get('/', moodsController.getAllMoods);

router.post('/', moodsController.addMood);

router.put('/:id', moodsController.updateMood);

router.delete('/:id', moodsController.deleteMood);

module.exports = router;
