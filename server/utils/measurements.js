const { dbCollection } = require('./db.js');

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const addedMeasurements = async (measurements) => {
  const collection = await dbCollection("weights");
  if (!collection) return;
  try {
    measurements.name = formatDate(new Date());
    await collection.insertOne(measurements);
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

const getMeasurements = async () => {
  const collection = await dbCollection("weights");
  if (!collection) return;
  try {
    const measurements = await collection.find().toArray();
    return measurements;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

module.exports = { addedMeasurements, getMeasurements };