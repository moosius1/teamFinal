const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllMoods = async (req, res) => {
  const result = await mongodb.getDb().db('journals').collection('moods').find();
  if (result) {
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } else {
    res.status(400).json(result.error || 'Error occurred while retrieving moods.');
  }
};

// const getJournalByMood = async (req, res) => {
//   const journalTitle = req.params.qurey;
//   const result = await mongodb.getDb().db().collection('journals').find({ mood: mood });
//   if (result) {
//     result.toArray().then((lists) => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(200).json(lists);
//     });
//   } else {
//     res.status(400).json(result.error || 'Error occurred while retrieving mood.');
//   }
// };


// const getJournalByUser = async (req, res) => {
//   if (!ObjectId.isValid(req.params.query)) {
//     res.status(400).json('Must use a valid user id.');
//   }
//   const userId = new ObjectId(req.params.query);
//   const result = await mongodb.getDb().db().collection('journals').find({ createdUserId: userId });
//   if (result) {
//     result.toArray().then((lists) => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(200).json(lists);
//     });
//   } else {
//     res.status(400).json(result.error || 'Error occurred while retrieving journals.');
//   }
// };


// const getOneJournal = async (req, res) => {
//   if (!ObjectId.isValid(req.params.id)) {
//     res.status(400).json('Must use a valid journal id.');
//   }
//   const journalId = new ObjectId(req.params.id);
//   const result = await mongodb.getDb().db().collection('journals').find({ _id: journalId });
//   if (result) {
//     result.toArray().then((lists) => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(200).json(lists[0]);
//     });
//   } else {
//     res.status(400).json(result.error || 'Error occurred while retrieving journal.');
//   }
// };

const addMood = async (req, res) => {
  const mood = {

    moodName: req.body.moodName,
    moodIcon: req.body.moodIcon
    
  };
  const response = await mongodb.getDb().db().collection('moods').insertOne(mood);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating mood.');
  }
};

const updateMood = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid moodId.');
  }
  const moodId = new ObjectId(req.params.id);
  const mood = {
    moodName: req.body.moodName,
    moodIcon: req.body.moodIcon
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('moods')
    .replaceOne({ _id: moodId }, mood);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while updating mood.');
  }
};

const deleteMood = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid moodId.');
  }
  const moodId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('moods')
    .deleteOne({ _id: moodId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting mood.');
  }
};

module.exports = { getAllMoods,addMood, updateMood, deleteMood};
