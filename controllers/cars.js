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

exports.getCarsCount = catchAsync(async (req, res, next) => {
  // Get Cars Count from DB
  const CarCollection = req.app.get("db").collection(collections.CARS);

  const carsCount = await CarCollection.countDocuments();

  res.status(200).json({
    status: "success",
    code: responseCodes.OK,
    message: "Cars Count",
    carsCount,
  });
});

exports.getCarById = catchAsync(async (req, res, next) => {
  let _id;

  try {
    _id = new ObjectId(req.params.id);
  } catch (error) {
    return next(
      new AppError(responseCodes.INVALID_PARAM, "Car ID is invalid", 400)
    );
  }

  // Get Car By ID from DB
  const CarCollection = req.app.get("db").collection(collections.CARS);

  const car = await CarCollection.findOne({
    _id,
  });

  if (!car) {
    return next(
      new AppError(responseCodes.CAR_NOT_FOUND, "Car does not exist", 404)
    );
  }

  res.status(200).json({
    status: "success",
    code: responseCodes.OK,
    message: `Car: ${req.params.id}`,
    car,
  });
});

exports.updateCar = catchAsync(async (req, res, next) => {
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

  // Check if category is being updated and the updated category exists
  if (data.category_id) {
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
  }

  let _id;

  try {
    _id = new ObjectId(req.params.id);
  } catch (error) {
    return next(
      new AppError(responseCodes.INVALID_PARAM, "Car ID is invalid", 400)
    );
  }

  const CarCollection = req.app.get("db").collection(collections.CARS);

  // Update Category name in DB
  const { value: car } = await CarCollection.findOneAndUpdate(
    {
      _id,
    },
    {
      $set: {
        ...data,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  if (!car) {
    return next(
      new AppError(responseCodes.CAR_NOT_FOUND, "Car does not exist", 404)
    );
  }

  res.status(200).json({
    status: "success",
    code: responseCodes.OK,
    message: "Car updated",
    car,
  });
});

exports.deleteCar = catchAsync(async (req, res, next) => {
  let _id;

  try {
    _id = new ObjectId(req.params.id);
  } catch (error) {
    return next(
      new AppError(responseCodes.INVALID_PARAM, "Car ID is invalid", 400)
    );
  }

  const CarCollection = req.app.get("db").collection(collections.CARS);

  // Delete Car from DB
  await CarCollection.deleteOne({
    _id,
  });

  res.status(200).json({
    status: "success",
    code: responseCodes.OK,
    message: "Car deleted",
    car_id: _id.toString(),
  });
});
