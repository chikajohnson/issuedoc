const validator = require('validator');
const modelObj  = require('./allModels');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "full name is required"],
    maxlength: 50
  },
  userName: {
    type: String,
    required: [true, "user name is required"],
    unique: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    minlength: 6,
    maxlength: 15,
    unique: true
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    select: true
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match!'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  activated : {type: Boolean, default: true},
  activationToken : String,
  activationExpires : Date,
  role: {
    type: String,
    enum: ["admin", "developer"],
    default: "developer"
  },
  active: {
    type: Boolean,
    default: true,
    select: false
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

userSchema.plugin(uniqueValidator);


userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete confirmPassword field
  this.confirmPassword = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  console.log(candidatePassword, userPassword);

  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 24 * 1000;

  return resetToken;
};

const User = mongoose.model(modelObj.user, userSchema);

module.exports = User;
