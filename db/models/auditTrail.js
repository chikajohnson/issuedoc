const mongoose = require('mongoose');
const modelObj = require('./allModels');

const auditTrailSchema = new mongoose.Schema({
  user: String,
  ipAddress: String,
  module: String,
  actionType: String,
  currentValue: String,
  previousValue: String,
  endPoint: String,
  fullUrl: String,
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
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

auditTrailSchema.pre(/^find/, (next) => {
  // this points to the current query
  next();
});


const AuditTrail = mongoose.model(modelObj.auditTrail, auditTrailSchema);

module.exports = AuditTrail;
