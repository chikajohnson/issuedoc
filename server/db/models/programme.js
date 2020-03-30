const mongoose = require("mongoose");
const modelObj = require('./allModels');

const programmeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "programme name is required"],
    },
    isPeriodic: {
        type: Boolean,
        required: true,
        default: false
    },
    type: {
        type: String,
        enum: ["diocese", "parish","society"],
        default: "parish"
    },
    start: {
        type: String,
        required: [true, "start time is required"]
    },

    end: {
        type: String,
        required: [true, "specify when the programme ends"]
    },
    attendance: {
        men: {
            type: Number,
            default: 0
        },
        women: {
            type: Number,
            default: 0
        },
        boys: {
            type: Number,
            default: 0
        },
        girls: {
            type: Number,
            default: 0
        },
        children: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        }
    },
    language: {
        type: String,
        default: "English"
    },
    officiatedBy: {
        type: String,
        required: false
    },
    parish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelObj.parish,
        required: [true, "parish is required"]
    },
    society: {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelObj.society,
    },
    description: {
        type: String,
        required: [true, "briefly describe this programme"],
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


programmeSchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

programmeSchema.pre(/^find/, function (next) {
    // this points to the current query
    next();
});

const Programme = mongoose.model(modelObj.programme, programmeSchema);

module.exports = Programme;
