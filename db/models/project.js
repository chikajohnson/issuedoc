const modelObj = require('./allModels');
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name is required."],
    unique: true,
    maxlength: 250,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, "Project description is required."]
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

 projectSchema.plugin(uniqueValidator, {message: "{PATH} '{VALUE}' already exists."});


projectSchema.pre(/^find/, function (next) {
  // this points to the current query
  next();
});


const Project = mongoose.model(modelObj.project, projectSchema);

module.exports = Project;
