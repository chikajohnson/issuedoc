const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');



const user = require('../routes/user');
const diocese = require('../routes/diocese');
const society = require('../routes/society');
const parish = require('../routes/parish');
const parishSociety = require('../routes/parishsociety');
const station = require('../routes/station');
const programme = require('../routes/programme');
const announcement = require('../routes/announcement');
const auth = require('../routes/auth');
const apiRootUrl = '/api/' + process.env.VERSION1 + '/';

module.exports = function(app) {
  console.log("apiUrlRoot", apiRootUrl);
  app.use(apiRootUrl + 'docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //swagger api doc endpoint
  app.use(apiRootUrl + 'auth', auth);
  app.use(apiRootUrl + 'users', user);
  app.use(apiRootUrl + 'dioceses', diocese);
  app.use(apiRootUrl + 'societies', society);
  app.use(apiRootUrl + 'parishes', parish);
  app.use(apiRootUrl + 'parishsocieties', parishSociety);
  app.use(apiRootUrl + 'programmes', programme);
  app.use(apiRootUrl + 'stations', station);
  app.use(apiRootUrl + 'announcements', announcement);

}