const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function dbCollection(collection) {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }
    return client.db("main-db").collection(collection);
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

module.exports = { dbCollection };