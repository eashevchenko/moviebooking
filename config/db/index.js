const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.plugin(require('./plugins/customQuery'));
mongoose.plugin(require('./plugins/hiddenPlugin'));

const dbUri = process.env.MONGODB_URL;
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
