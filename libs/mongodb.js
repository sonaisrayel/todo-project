const { MongoClient } = require('mongodb');
const { MONGO_URI } = process.env;
const MONGO_DB = 'todo';

const { ObjectId } = require('mongodb');

const { generateQuery } = require('../helpers/mongodb-helper.js');

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

const read = async (collection, params) => {
    try {
        //TODO write query based on params

        const query = await generateQuery(params);

        if (!dbConnection) {
            await establishConnection();
        }

        const coll = dbConnection.db(MONGO_DB).collection(collection);
        const data = await coll.find(query).toArray();

        return data;
    } catch (e) {
        throw new Error(`Error in ${collection} ${e.message}`);
    }
};

const update = async (collection, id, title) => {
    try {
        if (!dbConnection) {
            await establishConnection();
        }
        const coll = dbConnection.db(MONGO_DB).collection(collection);
        //TODO write function for this query
        return await coll.updateOne({ _id: new ObjectId(id) }, { $set: { title } });
    } catch (e) {
        throw new Error(`Error in ${collection} ${e.message}`);
    }
};

const del = async (collection, id) => {
    try {
        if (!dbConnection) {
            await establishConnection();
        }
        const coll = dbConnection.db(MONGO_DB).collection(collection);
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
