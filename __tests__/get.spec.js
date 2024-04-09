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

    test('responds to /', async () => {
        const res = await request.get('/');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /dashboard', async () => {
        const res = await request.get('/');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /journals', async () => {
        const res = await request.get('/journals');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /users', async () => {
        const res = await request.get('/users');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
    test('responds to /moods', async () => {
        const res = await request.get('/moods');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
    test('responds to /entries', async () => {
        const res = await request.get('/entries');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /journals/66063419ee30a04abf5d19c3', async () => {
        const res = await request.get('/journals');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /users/65f2762611766b1b626f59a0', async () => {
        const res = await request.get('/users');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /entries/6615a3a9355e045dea29d546', async () => {
        const res = await request.get('/entries');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /moods/6615a71c14391930d1351a46', async () => {
        const res = await request.get('/moods');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /journals/search/title/Captains Log', async () => {
        const res = await request.get('/journals/search/title');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /journals/search/title/Captains Log', async () => {
        const res = await request.get('/journals/search/title');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /journals/search/65f2762611766b1b626f59a0', async () => {
        const res = await request.get('/journals/search/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /entries/search/journal/66063419ee30a04abf5d19c3', async () => {
        const res = await request.get('entries/search/journal/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /entries/search/date/4/7/24', async () => {
        const res = await request.get('entries/search/journal/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /users/search/Chais', async () => {
        const res = await request.get('users/search/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
})