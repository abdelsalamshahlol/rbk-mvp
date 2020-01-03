// Handle DB connection
// connect and export the connecting to any model wants to use it
const mongoose = require('mongoose');
const url = `mongodb+srv://root:${process.env.DB_PASSWORD}@cluster0-9lqpr.mongodb.net/rMaker?retryWrites=true&w=majority`;

let db = mongoose.connect(url, {useNewUrlParser: true}, () => {
    console.log('DB connected');
});

module.exports = db;