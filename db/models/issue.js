const modelObj = require('./allModels');
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Issue title is required."],
    unique: true,
    maxlength: 250,
    lowercase: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: modelObj.project,
    required: [true, "project is required"]
  },
  description: {
    type: String,
    required: [true, "Issue description is required."]
  },
  resources:[
    new mongoose.Schema({
      name: {
        type: String,
        required: [true, "Issue resource name is required."],
        unique: true,
        maxlength: 250,
        lowercase: true
      },
  
      type: {
        type: String,
      },
      link: {
        type: String
      },    
      files: [{
        type: String
      }],
    })
  ],
  resolved: {
    type: Boolean,
    default: false
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: modelObj.user
  },
  closed: {
    type: Boolean,
    default: false,
  },
  closedOn: {
    type: Date
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  isSystemDefined: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: modelObj.user
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

 IssueSchema.plugin(uniqueValidator, {message: "{PATH} '{VALUE}' already exists."});


IssueSchema.pre(/^find/, function (next) {
  // this points to the current query
  next();
});


const Issue = mongoose.model(modelObj.issue, IssueSchema);

module.exports = Issue;
