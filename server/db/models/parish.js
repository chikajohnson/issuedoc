const randomString = require('randomstring');
const mongoose = require("mongoose");
const validator = require('validator');
const modelObj = require('./allModels');

const parishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Parish name is required"],
        unique: true
    },
    code: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    emails: [{ type: String, require: [true, "email is required"] }],
    phoneNumbers: [{ type: String, require: [true, "phonenumber is required"] }],
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    postalAddress: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false,
        unique: true,
        validate: [validator.isURL, 'Please provide a website address']
    },
    logo: {
        type: String,
        required: false
    },
    pastoralTeam: [
        {
            name: {
                type: String,
                required: [true, "name is required"]
            },
            title: {
                type: String,
                required: [true, "title is required"]
            },
            phoneNumber: {
                type: String,
                required: [true, "title is required"]
            },
            email: {
                type: String,
                required: [true, "email is required"],
            },
            disabled: {
                type: Boolean,
                default: false
            }
        }
    ],
    pictures: [String],
    slogan: {
        type: String,
        required: false
    },
    bankAccount: [{
        bank: String,
        accountNo: String
    }],
    feastDay: {
        type: String,
        required: false
    },
    patronSaint: {
        type: String,
        required: false
    },
    parishDay: {
        type: String,
        required: false
    },
    missionStatement: {
        type: String,
        required: false
    },
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    },
    town: {
        type: String,
        required: false
    },
    state: {
        type: String
    },
    denary: {
        type: String,
        required: true
    },
    diocese: {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelObj.diocese,
        required: [true, "diocese is required"]
    },
    description: {
        type: String,
        required: [true, "Give a brief description of this parish"]
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

parishSchema.index({'name': 1, 'diocese': 1}, {unique : true});

parishSchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

parishSchema.pre('save', function (next) {
    if (this.name && this.isNew) {
        this.code = this.name.substring(0, 7).toUpperCase() + "-" + randomString.generate({ length: 6, charset: 'alphabetic' }).toUpperCase();
    }
    next();
});

parishSchema.pre(/^find/, function (next) {
    next();
});

const Parish = mongoose.model(modelObj.parish, parishSchema);

module.exports = Parish;
