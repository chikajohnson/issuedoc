const Comment = require('../db/models/project');
const factory = require('./handlerFactory');
const populateoptions = [
    { path: 'createdBy', select: '-role -isSSystemDefined -activated -active -phoneNumber -fullName' }
];

exports.createComment = factory.createOne(Comment);

exports.getComment = factory.getOne(Comment, populateoptions);
exports.getAllComment = factory.getAll(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
