const mongoose = require('mongoose');

const initDB = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true});

  mongoose.connection.once('open', () => {
    console.log('connected to database');
  });
};

module.exports = initDB;
