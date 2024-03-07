const express = require('express');
const router = express.Router();

const validation = require('../middleware/validate');

const patientsController = require('../controllers/patientsController')

router.get('/', patientsController.getAllPatients);

router.get('/:id', patientsController.getOnePatient);

router.post('/', validation.savePatient, patientsController.addPatient);

router.put('/:id', validation.savePatient, patientsController.updatePatient);

router.delete('/:id', patientsController.deletePatient);

module.exports = router;
