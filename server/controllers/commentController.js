const Comment = require('../db/models/comment');
const factory = require('./handlerFactory');
const populateoptions = [
    { path: 'createdBy', select: '-role -isSSystemDefined -activated -active -phoneNumber -fullName' },
    {path: "issue", select: 'title project.name dsecription resources.name resources.link id'}
];

exports.createComment = factory.createOne(Comment);

exports.getComment = factory.getOne(Comment, populateoptions);
exports.getAllComment = factory.getAll(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
