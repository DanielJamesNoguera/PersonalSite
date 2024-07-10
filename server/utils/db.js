const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://doadmin:Kp97mZF45str0312@fitness-app-077e5092.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=fitness-app";

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