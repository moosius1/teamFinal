const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllPatients = async (req, res) => {
  const result = await mongodb.getDb().db('patients').collection('patients').find();
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } else {
    res.status(400).json(result.error || 'Error occurred while retrieving patients.');
  }
};

const getOnePatient = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid patient id.');
  }
  const patientId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('patients').collection('patients').find({ _id: patientId });
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } else {
    res.status(400).json(result.error || 'Error occurred while retrieving patient.');
  }
};

const addPatient = async (req, res) => {
  const patient = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    diagnosis: req.body.diagnosis,
    birthday: req.body.birthday,
    weightBearingStatus: req.body.weightBearingStatus,
    therapyOrderEndDate: req.body.therapyOrderEndDate,
    lastVisit: req.body.lastVisit,
    nextVisit: req.body.nextVisit,
    therapyGoals: req.body.therapyGoals,
    assignedNurse: req.body.assignedNurse
  };
  const response = await mongodb.getDb().db('patients').collection('patients').insertOne(patient);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating patient.');
  }
};

const updatePatient = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid patient id.');
  }
  const userId = new ObjectId(req.params.id);
  const patient = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    diagnosis: req.body.diagnosis,
    birthday: req.body.birthday,
    weightBearingStatus: req.body.weightBearingStatus,
    therapyOrderEndDate: req.body.therapyOrderEndDate,
    lastVisit: req.body.lastVisit,
    nextVisit: req.body.nextVisit,
    therapyGoals: req.body.therapyGoals,
    assignedNurse: req.body.assignedNurse
  };
  const response = await mongodb
    .getDb()
    .db('patients')
    .collection('patients')
    .replaceOne({ _id: userId }, patient);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while updating patient.');
  }
};

const deletePatient = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid patient id.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('patients')
    .collection('patients')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting patient.');
  }
};

module.exports = { getAllPatients, getOnePatient, addPatient, updatePatient, deletePatient };
