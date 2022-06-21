const { collections } = require("../db/collections");
const Category = require("../models/Category");
const AppError = require("../utils/AppError");
const { catchAsync } = require("../utils/catch.async");
const responseCodes = require("../utils/response.codes");

exports.createCategory = catchAsync(async (req, res, next) => {
  const joiError = req.joiError;
  if (req.joiError) {
    return next(
      new AppError(
        responseCodes.INVALID_REQ_BODY,
        joiError.details[0].message,
        400
      )
    );
  }

  const data = req.joiValue;

  const category = new Category(data.name);

  // Save new category to Database
  const CategoryCollection = req.app
    .get("db")
    .collection(collections.CATEGORIES);

  await CategoryCollection.insertOne(category);

  res.status(201).json({
    status: "success",
    code: responseCodes.OK,
    message: "New category created",
    category,
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
  // Get Categories from DB
  const CategoryCollection = req.app
    .get("db")
    .collection(collections.CATEGORIES);

  const categoriesCursor = await CategoryCollection.find();
  const categories = await categoriesCursor.toArray();

  res.status(200).json({
    status: "success",
    code: responseCodes.OK,
    message: "All Categories",
    categories,
  });
});
