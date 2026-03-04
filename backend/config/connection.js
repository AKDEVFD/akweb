const { connect, connection } = require('mongoose');

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/AKWeb';

connect(uri);

module.exports = connection;
