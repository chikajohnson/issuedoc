const Issue = require('../db/models/issue');
const factory = require('./handlerFactory');
const populateoptions = [
    { path: 'createdBy', select: '-role -isSystemDefined -activated -active -phoneNumber -fullName -createdAt' },
    { path: 'project', select: '-role -isSystemDefined -activated -active -createdBy -createdAt -id' }
];

const uniqueProperties = "title";
console.log("get issues");


exports.createIssue = factory.createOne(Issue, uniqueProperties);

exports.getIssue = factory.getOne(Issue, populateoptions);
exports.getAllIssues = factory.getAll(Issue);
exports.updateIssue = factory.updateOne(Issue, uniqueProperties);
exports.deleteIssue = factory.deleteOne(Issue);
