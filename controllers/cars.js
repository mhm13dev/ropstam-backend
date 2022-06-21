const { ObjectId } = require("mongodb");
const { collections } = require("../db/collections");
const Car = require("../models/Car");
const AppError = require("../utils/AppError");
const { catchAsync } = require("../utils/catch.async");
const responseCodes = require("../utils/response.codes");

exports.createCar = catchAsync(async (req, res, next) => {
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

  // Check if the category exists
  let category_id;

  try {
    category_id = new ObjectId(data.category_id);
  } catch (error) {
    return next(
      new AppError(responseCodes.INVALID_PARAM, "Category ID is invalid", 400)
    );
  }
  const CategoryCollection = req.app
    .get("db")
    .collection(collections.CATEGORIES);

  const category = await CategoryCollection.findOne({
    _id: category_id,
  });

  if (!category) {
    return next(
      new AppError(
        responseCodes.CATEGORY_NOT_FOUND,
        "Category does not exist",
        404
      )
    );
  }

  const car = new Car(
    data.model,
    data.make,
    data.color,
    data.reg_num,
    data.category_id
  );

  // Save new category to Database
  const CarCollection = req.app.get("db").collection(collections.CARS);

  await CarCollection.insertOne(car);

  res.status(201).json({
    status: "success",
    code: responseCodes.OK,
    message: "New car created",
    car,
  });
});

exports.getCars = catchAsync(async (req, res, next) => {
  // Get Cars from DB
  const CarCollection = req.app.get("db").collection(collections.CARS);

  const carsCursor = await CarCollection.find();
  const cars = await carsCursor.toArray();

  res.status(200).json({
    status: "success",
    code: responseCodes.OK,
    message: "All Cars",
    cars,
  });
});
