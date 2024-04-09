const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllEntries = async (req, res) => {
  const result = await mongodb.getDb().db().collection('entries').find();
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } else {
    res.status(400).json(result.error || 'Error occurred while retrieving entries.');
  }
};

const getEntriesByJournalId = async (req, res) => {
  if (!ObjectId.isValid(req.params.query)) {
    res.status(400).json('Must use a valid journal id.');
  }
  const journalId = req.params.query;
  const result = await mongodb.getDb().db('journals').collection('entries').find({ "journalId": journalId });
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } else {
    res.status(400).json(result.error || 'Error occurred while retrieving journal entries.');
  }
};

const getEntriesByDate = async (req, res) => {
  const entryDate = req.params.query;
  const result = await mongodb.getDb().db('journals').collection('entries').find({ "entryDate": entryDate });
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } else {
    res.status(400).json(result.error || 'Error occurred while retrieving journal entries.');
  }
};

const getOneEntry = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid entry id.');
  }
  const entryId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('journals').collection('entries').find({ _id: entryId });
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } else {
    res.status(400).json(result.error || 'Error occurred while retrieving entry.');
  }
};

const addEntry = async (req, res) => {
  const entry = {

//   Here are the fields we considered earlier.
//   Since we already have 7 within the users Object, it may make sense to use fewer here. 
// -Ian 

    journalId: req.body.journalId,
    title: req.body.title,
    content: req.body.content,
    mood: req.body.mood,
    tags: req.body.tags,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    entryDate: req.body.entryDate

    
  };
  const response = await mongodb.getDb().db().collection('entries').insertOne(entry);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating entry.');
  }
};

const updateEntry = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid entry id.');
  }
  const userId = new ObjectId(req.params.id);
  const entry = {
    journalId: req.body.journalId,
    title: req.body.title,
    content: req.body.content,
    mood: req.body.mood,
    tags: req.body.tags,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    entryDate: req.body.entryDate

  };
  const response = await mongodb
    .getDb()
    .db('journals')
    .collection('entries')
    .replaceOne({ _id: userId }, entry);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while updating entry.');
  }
};

const deleteEntry = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid entry id.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('journals')
    .collection('entries')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting entry.');
  }
};

module.exports = { getAllEntries, getOneEntry, addEntry, updateEntry, deleteEntry, getEntriesByJournalId, getEntriesByDate };
