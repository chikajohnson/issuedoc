const Comment = require('../db/models/project');
const factory = require('./handlerFactory');
const populateoptions = [
    { path: 'createdBy', select: '-password', select: '-password -photo -role -isSSystemDefined -activated -active -phoneNumber -fullName' }
];

const uniqueProperties = "name";

exports.createComment = factory.createOne(Comment, uniqueProperties);

exports.getComment = factory.getOne(Comment, populateoptions);
exports.getAllComment = factory.getAll(Comment);
exports.updateComment = factory.updateOne(Comment, uniqueProperties);
exports.deleteComment = factory.deleteOne(Comment);
