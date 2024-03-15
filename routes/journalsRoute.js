const express = require('express');
const router = express.Router();

const validation = require('../middleware/validate');

const journalsController = require('../controllers/journalsController')

router.get('/', journalsController.getAlljournals);

router.get('/:id', journalsController.getOnejournal);

router.post('/', journalsController.addjournal);

router.put('/:id', journalsController.updatejournal);

router.delete('/:id', journalsController.deletejournal);

module.exports = router;
