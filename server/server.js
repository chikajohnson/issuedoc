const winston = require('winston');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err);
  winston.info(err);
  process.exit(1);
});


const app = require('./app');

const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV);
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
  winston.info(`Listening on dedicated port  ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  winston.info(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});