const MongoClient = require('mongodb').MongoClient;

async function connectToDB() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const database = client.db('space_be_group');
        return database;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = connectToDB;