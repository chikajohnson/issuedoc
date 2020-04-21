const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const user = require('../routes/user');
const project = require('../routes/project');
const issue = require('../routes/issue');
const comment = require('../routes/comment');
const auth = require('../routes/auth');

const apiRootUrl = `/api/${process.env.VERSION1}/`;

module.exports = (app) => {
  app.use(`${apiRootUrl}docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // swagger api doc endpoint
  app.use(`${apiRootUrl}auth`, auth);
  app.use(`${apiRootUrl}users`, user);
  app.use(`${apiRootUrl}projects`, project);
  app.use(`${apiRootUrl}issues`, issue);
  app.use(`${apiRootUrl}comments`, comment);
};
