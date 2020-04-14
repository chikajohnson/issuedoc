const Project = require('../db/models/project');
const factory = require('./handlerFactory');
const populateoptions = [
    { path: 'createdBy', select: '-password -photo -role -isSSystemDefined -activated -active -phoneNumber -fullName' }
];

const uniqueProperties = "name";

exports.createProject = factory.createOne(Project, uniqueProperties);

exports.getProject = factory.getOne(Project, populateoptions);
exports.getAllProject = factory.getAll(Project);
exports.updateProject = factory.updateOne(Project, uniqueProperties);
exports.deleteProject = factory.deleteOne(Project);
