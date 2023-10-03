const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb+srv://agbu:OhhwbrmP8iDsc7V2@cluster0.w5tklqg.mongodb.net/?retryWrites=true&w=majority';
const MONGO_DB = 'todo';

let mongoClient;
let dbConnection;

const establishConnection = async () => {
    try {
        if (!mongoClient) {
            mongoClient = new MongoClient(MONGO_URI);
            dbConnection = await mongoClient.connect();
        }
    } catch (err) {
        console.error('Connection error:', err.message);
        throw new Error('Failed to establish database connection.');
    }
};

const getAll = async (collection) => {
    try {
        if (!dbConnection) {
            await establishConnection();
        }

        const coll = dbConnection.db(MONGO_DB).collection(collection);
        return await coll.find({}).toArray();
    } catch (e) {
        throw new Error(`Error in todos ${e.message}`);
    }
};

const create = async (collection, data) => {
    try {
        if (!dbConnection) {
            await establishConnection();
        }
        const coll = dbConnection.db(MONGO_DB).collection(`${collection}`);
        return await coll.insertOne(data);
    } catch (e) {
        throw new Error(`Error in users ${e.message}`);
    }
};

//TODO need to change for some generic solution
const edit = async (collection, id, data) => {
    try {
        if (!dbConnection) {
            await establishConnection();
        }
        const coll = dbConnection.db(MONGO_DB).collection(`${collection}`);
        return await coll.updateOne(id, data);
    } catch (e) {
        throw new Error(`Error in users ${e.message}`);
    }
};

module.exports = {
    getAll,
    create,
    edit,
};
