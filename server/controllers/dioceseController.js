
const Diocese = require('../db/models/diocese');
const factory = require('./handlerFactory');

exports.createDiocese = factory.createOne(Diocese);

exports.getDiocese = factory.getOne(Diocese);
exports.getAllDiocese = factory.getAll(Diocese);
exports.updateDiocese = factory.updateOne(Diocese);
exports.deleteDiocese = factory.deleteOne(Diocese);
