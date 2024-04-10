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
        });
        db = await connection.db('journals')
    });
    afterAll(async() => {
        await connection.close()
    })

    test('responds to post /users', async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI, {
        });
        db = await connection.db('journals')
        const res = await request.post('/users').send(    {
            googleId: 'some-google-id',
            firstName: "Tommy",
            lastName: "Monson",
            displayName: "Tommy Monson",
            image: "some-image",
            createdAt: "some-date-time",
            assignedJournals: "some-jounals"
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
    })

    test('responds to post /moods', async () => {
        const res = await request.post('/moods').send(    {
            moodName: "Slimy",
            moodIcon: "any"
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
    })

    test('responds to post /entries', async () => {
        const res = await request.post('/entries').send(    {
            journalId: "some-journal-id",
            title: "some-title",
            content: "some-content",
            mood: "some-mood",
            tags: "some-tag",
            createdAt: "some-date",
            updatedAt: "some-date",
            entryDate: "some-date"
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
    })

    test('responds to post /journals', async () => {
        const res = await request.post('/journals').send(    {
            journalTitle: "some-journal-title",
            theme: "some-journal-theme",
            createdUserId: "some-user-id",
            createdAt: "some-date",
            updatedAt: "some-date",
            entries: ["some-entries"]
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
    })

})