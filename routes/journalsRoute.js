const express = require('express');
const router = express.Router();

const validation = require('../middleware/validate');

const journalsController = require('../controllers/journalsController')

router.get('/', journalsController.getAllJournals);

router.get('/search/title/:query', journalsController.getJournalByTitle);

router.get('/search/:query', journalsController.getJournalByUser);

router.get('/:id', journalsController.getOneJournal);

router.post('/', journalsController.addJournal);

router.put('/:id', journalsController.updateJournal);

router.delete('/:id', journalsController.deleteJournal);

module.exports = router;
