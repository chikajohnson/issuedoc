const mongoose = require("mongoose");
const modelObj  = require('./allModels');

const provinceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "province name is required"]
    },
    description: {
        type: String,
        required: [true, "Describe this province"]
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


provinceSchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

provinceSchema.pre(/^find/, function (next) {
    // this points to the current query
    next();
});

const Province = mongoose.model(modelObj.province, provinceSchema);

module.exports = Province;
