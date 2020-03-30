const mongoose = require("mongoose");
const modelObj  = require('./allModels');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    narration: {
        type: String,
        required: [true, "announcement narration is required"]
    },
    sourceType: {
        type: String,
        enum: ["diocese", "parish", "station", "society"],
        default: "parish"
    },
    source: {
        type: Object
    },
    start: {
        type: Date
    },

    end: {
        type: Date
    },
    media: {
        type: String 
    },
    venue: String,
    parish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelObj.parish,
        required: [true, "parish is required"]
    },
    active: {
        type: Boolean,
        default: true
    },
    isSystemDefined: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelObj.user,
      },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
    }
},
{
  toJSON: {virtuals : true},
  toObject: {virtuals : true}
});


announcementSchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

announcementSchema.pre(/^find/, function (next) {
    // this points to the current query
    next();
});

const Announcement = mongoose.model(modelObj.announcement, announcementSchema);

module.exports = Announcement;
