const { MongoClient } = require('mongodb');
const { MONGO_URI } = process.env;
const MONGO_DB = 'todo';

const { ObjectId } = require('mongodb');

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

const create = async (collection, data) => {
    try {
        if (!dbConnection) {
            await establishConnection();
        }
        const coll = dbConnection.db(MONGO_DB).collection(collection);
        return await coll.insertOne(data);
    } catch (e) {
        throw new Error(`Error in ${collection} ${e.message}`);
    }
};

const read = async (collection, id) => {
    try {
        if (!dbConnection) {
            await establishConnection();
        }

        const coll = dbConnection.db(MONGO_DB).collection(`${collection}`);
        const data = id ? await coll.findOne({ _id: new ObjectId(id) }) : await coll.find({}).toArray();

        return data;
    } catch (e) {
        throw new Error(`Error in ${collection} ${e.message}`);
    }
};

const update = async (collection, id, data) => {
    try {
        if (!dbConnection) {
            await establishConnection();
        }
        const coll = dbConnection.db(MONGO_DB).collection(`${collection}`);
        return await coll.updateOne({ _id: new ObjectId(id) }, { $set: { data } });
    } catch (e) {
        throw new Error(`Error in ${collection} ${e.message}`);
    }
};

const del = async (collection, id) => {
    try {
        if (!dbConnection) {
            await establishConnection();
        }
        const coll = dbConnection.db(MONGO_DB).collection(`${collection}`);
        return await coll.deleteOne({ _id: new ObjectId(id) });
    } catch (e) {
        throw new Error(`Error in ${collection} ${e.message}`);
    }
};

module.exports = {
    read,
    create,
    update,
    del,
};
