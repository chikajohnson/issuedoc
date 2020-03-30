const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const user = require('../routes/user');
const parish = require('../routes/parish');
const auth = require('../routes/auth');
const apiRootUrl = '/api/' + process.env.VERSION1 + '/';

module.exports = function(app) {
  console.log("apiUrlRoot", apiRootUrl);
  app.use(apiRootUrl + 'docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //swagger api doc endpoint
  app.use(apiRootUrl + 'auth', auth);
  app.use(apiRootUrl + 'users', user);
  app.use(apiRootUrl + 'parishes', parish);
}