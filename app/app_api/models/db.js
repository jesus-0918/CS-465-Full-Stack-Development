const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1/travlr';

const connect = () => {
  setTimeout(() => mongoose.connect(dbURI), 1000);
};

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

connect();

const gracefulShutdown = async (msg) => {
  await mongoose.connection.close();
  console.log(`Mongoose disconnected through ${msg}`);
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart');
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination').then(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown').then(() => {
    process.exit(0);
  });
});

require('./travlr');
require('./users');