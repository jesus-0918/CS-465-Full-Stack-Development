const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

require('./db');
require('./travlr');

const Trip = mongoose.model('trips');

const trips = JSON.parse(
fs.readFileSync(path.join(__dirname, '../../../data/trips.json'), 'utf8')
);

const seedDB = async () => {
  try {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);

    console.log(`Successfully loaded ${trips.length} trips into MongoDB.`);
  } catch (err) {
    console.error('Error loading trip data:', err);
  } finally {
    await mongoose.connection.close();
  }
};

mongoose.connection.once('open', seedDB);