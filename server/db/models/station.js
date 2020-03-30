const randomString = require('randomstring');
const modelObj = require('./allModels');
const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "station name is required"]
    },
    code: {
        type: String
    },
    parish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelObj.parish,
        required: [true, "parish is required"],
    },
    emails: [String],
    phoneNumbers: [String],
    address: {
        type: String,
        required: [true, "station address is required"]
    },
    logo: {
        type: String,
        required: false
    },
    feastDay: {
        type: String,
        required: false
    },
    patronSaint: {
        type: String,
        required: false
    },
    latitude: {
        type: Number,
        required: false
    },
    longititude: {
        type: Number,
        required: false
    },
    town: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
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
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

stationSchema.index({ 'name': 1, 'parish': 1 }, { unique: true, message: "A similar station has been created for this parish" });

stationSchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

stationSchema.pre('save', function (next) {
    if (this.name && this.isNew) {
        this.code = this.name.substring(0, 7).toUpperCase() + "-" + randomString.generate({ length: 6, charset: 'alphabetic' }).toUpperCase();
    }
    next();
});

stationSchema.pre(/^find/, function (next) {
    // this points to the current query
    next();
});

const Station = mongoose.model(modelObj.station, stationSchema);

module.exports = Station;