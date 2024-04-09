const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllJournals = async (req, res) => {
  const result = await mongodb.getDb().db('journals').collection('journals').find();
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } else {
    res.status(400).json(result.error || 'Error occurred while retrieving journals.');
  }
};

const getJournalByTitle = async (req, res) => {
  const journalTitle = req.params.qurey;
  const result = await mongodb.getDb().db('journals').collection('journals').find({ journalTitle: journalTitle });
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } else {
    res.status(400).json(result.error || 'Error occurred while retrieving journal.');
  }
};


const getJournalByUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.query)) {
    res.status(400).json('Must use a valid user id.');
  }
  const userId = new ObjectId(req.params.query);
  const result = await mongodb.getDb().db('journals').collection('journals').find({ createdUserId: userId });
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } else {
    res.status(400).json(result.error || 'Error occurred while retrieving journals.');
  }
};


const getOneJournal = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid journal id.');
  }
  const journalId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('journals').collection('journals').find({ _id: journalId });
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } else {
    res.status(400).json(result.error || 'Error occurred while retrieving journal.');
  }
};

const addJournal = async (req, res) => {
  const journal = {

    //I've added in the four fields for journals here
    //If I remember correctly we were going to have
    //the entry object have the 7 fields we need
    //-Ian

    journalTitle: req.body.journalTitle,
    theme: req.body.theme,
    createdUserId: req.body.createdUserId,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    entries: []
    
  };
  const response = await mongodb.getDb().db('journals').collection('journals').insertOne(journal);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating journal.');
  }
};

const updateJournal = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid journal id.');
  }
  const userId = new ObjectId(req.params.id);
  const journal = {
    journalTitle: req.body.journalTitle,
    theme: req.body.theme,
    createdUserId: req.body.userId,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    entries: []
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

const deleteJournal = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid journal id.');
  }
  const journalId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('journals')
    .collection('journals')
    .deleteOne({ _id: journalId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting journal.');
  }
};

module.exports = { getAllJournals, getOneJournal, addJournal, updateJournal, deleteJournal, getJournalByTitle, getJournalByUser };
