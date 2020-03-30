
const Programme = require('../db/models/programme');
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

exports.createProgramme = factory.createOne(Programme);

exports.getProgramme = factory.getOne(Programme, populateoptions);
exports.getAllProgramme = factory.getAll(Programme, populateoptions[0]);
exports.updateProgramme = factory.updateOne(Programme);
exports.deleteProgramme = factory.deleteOne(Programme);
