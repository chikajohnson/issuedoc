
const Announcement = require('../db/models/announcement');
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

exports.createAnnouncement = factory.createOne(Announcement);

exports.getAnnouncement = factory.getOne(Announcement, populateoptions);
exports.getAllAnnouncement = factory.getAll(Announcement, populateoptions);
exports.updateAnnouncement = factory.updateOne(Announcement);
exports.deleteAnnouncement = factory.deleteOne(Announcement);
