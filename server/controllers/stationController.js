
const Station = require('../db/models/station');
const factory = require('./handlerFactory');

const populateoptions = [
    {
        path: 'parish',
        select: 'name province'
    },
     {
        path: 'createdBy',
        select: 'email id'
    }
];

exports.createStation = factory.createOne(Station);

exports.getStation = factory.getOne(Station, populateoptions);
exports.getAllStation = factory.getAll(Station);
exports.updateStation = factory.updateOne(Station);
exports.deleteStation = factory.deleteOne(Station);
