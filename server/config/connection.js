const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/BookFind_db');

module.exports = mongoose.connection;
