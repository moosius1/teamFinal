const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken'); // Assuming you're using jsonwebtoken for token generation
const { ACCESS_TOKEN_SECRET } = require('../config'); // Ensure this secret is securely stored

const createAccessToken = async (userId) => {
  // Generate a signed access token with appropriate claims and expiration
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' }); // Adjust expiration as needed
};

// Add other accessToken-related functions as needed, such as:
// - verifyAccessToken
// - revokeAccessToken

const createAccessTokenAndSave = async (req, res) => {
  if (!ObjectId.isValid(req.params.userId)) {
    return res.status(400).json('Must use a valid user ID.');
  }

  const userId = new ObjectId(req.params.userId);

  try {
    const accessToken = await createAccessToken(userId);

    const response = await mongodb.getDb()
      .db('journals')
      .collection('accessTokens') // Assuming you're storing tokens in a MongoDB collection
      .insertOne({ userId, accessToken });

    if (response.acknowledged) {
      return res.status(201).json({ accessToken });
    } else {
      res.status(500).json({ error: 'Failed to create and save access token.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// ... Add other routes as needed, ensuring proper error handling and security

module.exports = { createAccessTokenAndSave }; // Adjust exported functions as needed
