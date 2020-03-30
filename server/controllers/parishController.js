
const Parish = require('../db/models/parish');
const factory = require('./handlerFactory');
const populateoptions = [
    { path: 'diocese', select: 'name province' }, 
    { path: 'createdBy', select: 'email id' }
];

exports.createParish = factory.createOne(Parish);

exports.getParish = factory.getOne(Parish, populateoptions);
exports.getAllParish = factory.getAll(Parish, populateoptions);
exports.updateParish = factory.updateOne(Parish);
exports.deleteParish = factory.deleteOne(Parish);
