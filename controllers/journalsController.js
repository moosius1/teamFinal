const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAlljournals = async (req, res) => {
  const result = await mongodb.getDb().db().collection('journals').find();
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } else {
    res.status(400).json(result.error || 'Error occurred while retrieving journals.');
  }
};

const getOnejournal = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid journal id.');
  }
  const journalId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('journals').find({ _id: journalId });
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } else {
    res.status(400).json(result.error || 'Error occurred while retrieving journal.');
  }
};

const addjournal = async (req, res) => {
  const journal = {
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
  const response = await mongodb.getDb().db().collection('journals').insertOne(journal);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating journal.');
  }
};

const updatejournal = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid journal id.');
  }
  const userId = new ObjectId(req.params.id);
  const journal = {
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
    .db('journals')
    .collection('journals')
    .replaceOne({ _id: userId }, journal);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while updating journal.');
  }
};

const deletejournal = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid journal id.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('journals')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting journal.');
  }
};

module.exports = { getAlljournals, getOnejournal, addjournal, updatejournal, deletejournal };
