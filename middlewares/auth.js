const jwt = require("jsonwebtoken");
const { collections } = require("../db/collections");
const { catchAsync } = require("../utils/catch.async");
const AppError = require("../utils/AppError");
const { ObjectId } = require("mongodb");

const authenticate = catchAsync(async (req, res, next) => {
  // 1) Get & Check if there is auth token in the header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If there is no token, it says logged_out then return an AppError
  if (!token || token === "logged_out") {
    return next(
      new AppError(
        "unauthenticated",
        "You are not logged in. Please Log in to get access",
        401
      )
    );
  }

  // 2) Verification of JWT
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError("jwt_error", "Please login to get access", 401));
  }

  // 3) Check if user still exists
  const UserCollection = req.app.get("db").collection(collections.USERS);
  const currentUser = await UserCollection.findOne({
    _id: new ObjectId(decoded.sub),
  });

  if (!currentUser) {
    return next(new AppError("user_not_found", "User does not exist", 404));
  }

  // 4) Grant Access To Protected Route
  req.currentUser = currentUser;
  next();
});

// Check if the user is logged in
const isLoggedIn = catchAsync(async (req, res, next) => {
  // 1) Get & Check if there is auth token in the header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If there is no token, it says logged_out then return an AppError
  if (!token || token === "logged_out") {
    return next();
  }

  // 2) Verification of JWT
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next();
  }

  // 3) Check if user still exists
  const UserCollection = req.app.get("db").collection(collections.USERS);
  const currentUser = await UserCollection.findOne({
    _id: new ObjectId(decoded.sub),
  });

  if (!currentUser) {
    return next();
  }

  // 4) Grant Access To Protected Route
  req.currentUser = currentUser;
  return next();
});

module.exports = {
  authenticate,
  isLoggedIn,
};
