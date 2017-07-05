const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbUri = 'mongodb://localhost:27017/mbooking';
const connection = mongoose.connection;

const mongooseOptions = {
    useMongoClient: false,
    reconnectTries: 5
};

mongoose.connect(dbUri, mongooseOptions);
mongoose.set('debug', true);

connection.on('connected', () => console.log(`Mongoose connected to ${dbUri}`));
connection.on('error', (err) => console.error('MongoDB error: %s', err));
connection.on('disconnected', () => console.log(`Mongoose disconnected from ${dbUri}`));
