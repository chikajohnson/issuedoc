const Issue = require('../db/models/issue');
const factory = require('./handlerFactory');
const populateoptions = [
    { path: 'createdBy', select: '-password -photo -role -isSSystemDefined -activated -active -phoneNumber -fullName' }
];

const uniqueProperties = "name";

exports.createIssue = factory.createOne(Issue, uniqueProperties);

exports.getIssue = factory.getOne(Issue, populateoptions);
exports.getAllIssue = factory.getAll(Issue);
exports.updateIssue = factory.updateOne(Issue, uniqueProperties);
exports.deleteIssue = factory.deleteOne(Issue);
