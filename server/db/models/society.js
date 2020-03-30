const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const modelObj  = require('./allModels');

const societySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "society name is required"],
        unique : true,
    },
    shortName: {
        type: String,
        unique: [true, "Another society is using that short name"],
        maxlength: 10
    },
    description: {
        type: String,
        required: [true, "Describe this society"]
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

societySchema.plugin(uniqueValidator);

societySchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

societySchema.pre(/^find/, function (next) {
    // this points to the current query
    next();
});

const Society = mongoose.model(modelObj.society, societySchema);

module.exports = Society;
