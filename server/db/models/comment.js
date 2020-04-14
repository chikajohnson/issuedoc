const modelObj = require('./allModels');
const mongoose = require("mongoose");

      const commentSchema = new mongoose.Schema({
        body: {
          type: String,
          required: [true, "Comment body is required."]
        },
        published: {
          type: Boolean,
          default: true
        },
        issue: {
          type: mongoose.Schema.Types.ObjectId,
          ref: modelObj.issue,
          required: [true, "Issue is required"]
        },
        response: [
          new mongoose.Schema({
            body: {
              type: String,
              required: [true, "Comment body is required."]
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
          })
        ],
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


commentSchema.pre(/^find/, function (next) {
  // this points to the current query
  next();
});


const Comment = mongoose.model(modelObj.comment, commentSchema);

module.exports = Comment;
