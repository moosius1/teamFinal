const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('insert', () => {
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

    it('should insert a new user into the users collection', async () => {
        const users = db.collection('users');

        const mockUser = {
            id: 'some-user-id',
            googleId: 'some-google-id',
            firstName: "Tommy",
            lastName: "Monson",
            displayName: "Tommy Monson",
            image: "some-image",
            createdAt: "some-date-time",
            assignedJournals: "some-jounals"
            
        }

        await users.insertOne(mockUser)

        const insertedUser = await users.findOne({ id: 'some-user-id' });

        expect(insertedUser).toEqual(mockUser)
    },
        
    it('should delete a user from the users collection', async () => {
        const users = db.collection('users')
        await users.deleteMany({ id: 'some-user-id' })
        const deletedUser = await users.findOne({ id: 'some-user-id' });
        expect(deletedUser).toEqual(null)
    })
    ),

    it('should insert a new mood into the moods collection', async () => {
        const moods = db.collection('moods');

        const mockMood = {
            id: 'some-mood-id',
            moodName: "Slimy",
            moodIcon: "any"
        }

        await moods.insertOne(mockMood)

        const insertedMood = await moods.findOne({ id: 'some-mood-id' });

        expect(insertedMood).toEqual(mockMood)
    },
        
    it('should delete a mood from the moods collection', async () => {
        const moods = db.collection('moods')
        await moods.deleteMany({ id: 'some-mood-id' })
        const deletedMood = await moods.findOne({ id: 'some-mood-id' });
        expect(deletedMood).toEqual(null)
    })
),
    it('should insert a new entry into the entries collection', async () => {
        const entries = db.collection('entries');

        const mockEntry = {
            id: 'some-entry-id',
            journalId: "some-journal-id",
            title: "some-title",
            content: "some-content",
            mood: "some-mood",
            tags: "some-tag",
            createdAt: "some-date",
            updatedAt: "some-date",
            entryDate: "some-date"
        }

        await entries.insertOne(mockEntry)

        const insertedEntry = await entries.findOne({ id: 'some-entry-id' });

        expect(insertedEntry).toEqual(mockEntry)
    },
        
    it('should delete an entry from the entries collection', async () => {
        const entries = db.collection('entries')
        await entries.deleteMany({ id: 'some-entry-id' })
        const deletedEntry = await entries.findOne({ id: 'some-entry-id' });
        expect(deletedEntry).toEqual(null)
    })
    ),
    it('should insert a new journal into the journals collection', async () => {
        const journals = db.collection('journals');

        const mockJournal = {
            id: 'some-journal-id',
            journalTitle: "some-journal-title",
            theme: "some-journal-theme",
            createdUserId: "some-user-id",
            createdAt: "some-date",
            updatedAt: "some-date",
            entries: ["some-entries"]
        }

        await journals.insertOne(mockJournal)

        const insertedJournal = await journals.findOne({ id: 'some-journal-id' });

        expect(insertedJournal).toEqual(mockJournal)
    },
        
    it('should delete a journal from the journals collection', async () => {
        const journals = db.collection('journals')
        await journals.deleteMany({ id: 'some-journal-id' })
        const deletedJournal = await journals.findOne({ id: 'some-journal-id' });
        expect(deletedJournal).toEqual(null)
    })    

)})