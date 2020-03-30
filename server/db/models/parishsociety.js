const mongoose = require("mongoose");
const modelObj = require('./allModels');

const parishSocietySchema = new mongoose.Schema({
    society: {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelObj.society,
        required: [true, "society is required"]
    },
    parish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelObj.parish,
        required: [true, "parish is required"]
    },
    type: { //whether parish or station
        type: String,
        default: "parish",
        enum: { values: ["parish", "station"], message: "society type can either be 'parish' or 'station'" }
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelObj.station
    },
    diocese: {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelObj.diocese,
        required: [true, "diocese is required"],
        select : false
    },
    meeting: [
        {
            name: String,
            start: String,
            end: String,
            day: String,
            venue: String,
            duration: Number,
            information: {
                type: String,
                maxLength: 50
            },

        }
    ],
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
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

parishSocietySchema.index({'society': 1, 'parish': 11}, {unique : true},{ message : "A similar society has been created for this parish"});

parishSocietySchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

parishSocietySchema.pre(/^find/, function (next) {
    next();
});

const ParishSociety = mongoose.model(modelObj.parishSociety, parishSocietySchema);


module.exports = ParishSociety;
