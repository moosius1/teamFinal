const app = require('../app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();


describe('Test Handlers', () => {
    let connection;
    let db;

    beforeAll(async () => {

        connection = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('journals')
    });
    afterAll(async() => {
        await connection.close()
    })
    test('responds to /entries', async () => {
        const res = await request.get('/entries');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /users', async () => {
        const res = await request.get('/users');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
})