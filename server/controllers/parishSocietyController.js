
const ParishSociety = require('../db/models/parishsociety');
const factory = require('./handlerFactory');

const populateOptions = [
    {
        path: 'society',
        select: 'name shortName'
    },
    {
        path: 'parish',
        select: 'name',
    },
    {
        path: 'createdBy',
        select: 'email',
    }
];

exports.createParishSociety = factory.createOne(ParishSociety);

exports.getParishSociety = factory.getOne(ParishSociety, populateOptions);
exports.getAllParishSocieties = factory.getAll(ParishSociety);
exports.updateParishSociety = factory.updateOne(ParishSociety);
exports.deleteParishSociety = factory.deleteOne(ParishSociety);
