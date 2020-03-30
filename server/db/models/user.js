const validator = require('validator');
const modelObj  = require('./allModels');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    maxlength: 50
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    maxlength: 50
  },
  otherNames: {
    type: String,
    required: false,
    maxlength: 100
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
    required: [true, "Phone is required"],
    minlength: 6,
    maxlength: 15,
    unique: true
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  gender: {
    type: String,
    required: [true, "Specify your gender"],
    enum: ["female", "male"],
  },
  placeOfBirth: {
    type: String,
    required: [true, "Place of birth is required"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  parish: {
    type: String,
    required: [true, "Enter the name of your parish"],
  },
  station: {
    type: String,
    required: false,
  },
  diocessse: {
    type: String
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
  activated : {type: Boolean, default: false},
  activationToken : String,
  activationExpires : Date,
  role: {
    type: String,
    enum: ["clergy", "lay", "user", "admin", "globalAdmin", "developer"],
    default: "lay"
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

userSchema.methods.createActivationToken = function () {
  const token = crypto.randomBytes(32).toString('hex');

  this.activationToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  this.activationExpires = Date.now() + 10 * 60 * 24 * 1000;

  return token;
};

userSchema.methods.generateActivationCode = function () {
  //generate 6 character random code
  const code = crypto.randomBytes(6).toString();
  return code;
};

const User = mongoose.model(modelObj.user, userSchema);

module.exports = User;
