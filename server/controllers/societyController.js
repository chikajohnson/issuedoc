
const Society = require('../db/models/society');
const factory = require('./handlerFactory');

exports.createSociety = factory.createOne(Society);

exports.getSociety = factory.getOne(Society);
exports.getAllSociety = factory.getAll(Society);
exports.updateSociety = factory.updateOne(Society);
exports.deleteSociety = factory.deleteOne(Society);
