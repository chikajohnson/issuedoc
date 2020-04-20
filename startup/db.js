const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
  let db = "";
  switch (process.env.NODE_ENV) {
    case "production":
      db = process.env.DB_LOCAL;
      break;
    case "testing":
      db = process.env.DB_TEST;
      break;
    case "development":
      db = process.env.DB_LOCAL;
      break;
    default:
      db = process.env.DB_LOCAL;
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
      winston.log("info", 'db connection successful!');
    });
}

