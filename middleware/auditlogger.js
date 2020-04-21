const axios = require('axios');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AuditModel = require('../db/models/auditTrail');
const User = require('../db/models/user');

const logAudit = () => async (req, res, next) => {
  const requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  let previousValue = {};

  if (req.method !== 'GET') {
    if (req.method === 'PATCH') {
      const response = await axios.get(requestUrl);
      previousValue = await response.data;
    }

    const user = await getCurrentUser(req, jwt, User);
    const newAudit = await AuditModel.create({
      user,
      module: getModule(req.originalUrl),
      actionType: req.method,
      currentValue: req.body && JSON.stringify(req.body),
      previousValue: previousValue && JSON.stringify(previousValue).toString(),
      endPoint: req.originalUrl,
      fullUrl: requestUrl,
      ipAddress: req.headers['x-forwarded-for']
                    || req.connection.remoteAddress
                    || req.socket.remoteAddress
                    || (req.connection.socket ? req.connection.socket.remoteAddress : null),
      createdBy: req.user && req.user.id
    });

    await newAudit.save();
  }

  function getModule(url) {
    const filteredItems = ['v1', 'api', 'doc'];
    let appModule = '';
    if (!url) {
      return appModule;
    }
    const urlItems = url.split('/');

    for (let i = 0; i < urlItems.length; i++) {
      if (urlItems[i] && !filteredItems.includes(urlItems[i])) {
        appModule = urlItems[i];
        break;
      }
    }

    return appModule;
  }

  async function getCurrentUser(request, jwtoken, userModel) {
    // Getting token and check of it's there
    let token;
    let currentUser;
    if (
      request.headers.authorization
                && request.headers.authorization.startsWith('Bearer')
    ) {
      token = request.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return currentUser;
    }

    // verify token
    const decoded = await promisify(jwtoken.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    currentUser = await userModel.findById(decoded.id);
    return currentUser;
  }
  next();
};

module.exports = logAudit;
