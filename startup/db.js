const winston = require('winston');
const mongoose = require('mongoose');


module.exports = () => {
  let db = '';
  switch (process.env.NODE_ENV) {
    case 'production':
      db = process.env.DATABASE_URI;
      break;
    case 'testing':
      db = 'mongodb://localhost/issuedoc';
      break;
    case 'development':
      db = process.env.DATABASE_URI;
      break;
    case 'staging':
      db = process.env.DATABASE_URI;
      break;
    default:
      db = process.env.DATABASE_URI;
      break;
  }
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      autoIndex: false
    })
    .then(() => {
      winston.log('info', 'db connection successful!');
    });
};
