/* eslint-disable no-await-in-loop */
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

function convertToLower(item) {
  if (item) {
    return item.toLowerCase();
  }
  return null;
}

exports.deleteOne = (Model) => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    message: 'document  successfully deleted'
  });
});

exports.updateOne = (Model, uniqueProperties) => catchAsync(async (req, res, next) => {
  if (uniqueProperties) {
    const properties = uniqueProperties.split(' ');
    for (let i = 0; i < properties.length; i++) {
      const prop = properties[i];
      const exists = await Model.findOne({ name: convertToLower(req.body[prop]), _id: { $ne: req.params.id } });
      if (exists) {
        if (prop.includes('.')) {
          const splittedProp = prop.split('.');
          return next(new AppError(`'${req.body[splittedProp[0]][0][splittedProp[1]]}' already exists.`, 400));
        }
        return next(new AppError(`'${req.body[prop]}' already exists.`, 400));
      }
    }
  }

  req.body.updatedAt = Date.now();
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query'
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: doc
  });
});

exports.createOne = (Model, uniqueProperties) => catchAsync(async (req, res, next) => {
  if (uniqueProperties) {
    const properties = uniqueProperties.split(' ');
    for (let i = 0; i < properties.length; i++) {
      const prop = properties[i];

      const exists = await Model.findOne({ name: convertToLower(req.body[prop]) });


      if (exists) {
        return next(new AppError(`'${req.body[prop]}' already exists.`, 400));
      }
    }
  }

  const doc = await Model.create(req.body);

  res.status(201).json({
    status: 'success',
    data: doc
  });
});

exports.getOne = (Model, populateOptions) => catchAsync(async (req, res, next) => {
  let query = Model.findOne({ _id: req.params.id });
  if (populateOptions) query = query.populate(populateOptions);
  const doc = await query;

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: doc
  });
});

exports.getAll = (Model, populateOptions) => catchAsync(async (req, res, next) => {
  const filter = { active: true };

  const features = new APIFeatures(Model.find().populate(populateOptions), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    // const doc = await features.query.explain();
  const doc = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: doc
  });
});


