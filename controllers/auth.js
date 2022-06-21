const { catchAsync } = require("../utils/catch.async");
const { collections } = require("../db/collections");
const AppError = require("../utils/AppError");
const User = require("../models/User");
const { sendSignupMail } = require("../utils/email");

exports.signup = catchAsync(async (req, res, next) => {
  //   If a user is logged in, Don't allow them to signup
  if (req.currentUser) {
    return next(
      new AppError("already_logged_in", "You are already logged in.", 403)
    );
  }

  // If there is any validation error from Joi, then return an AppError
  const joiError = req.joiError;
  if (req.joiError) {
    return next(
      new AppError("invalid_req_body", joiError.details[0].message, 400)
    );
  }

  // Validated Request Body
  const data = req.joiValue;

  // Auto Generated Password
  const password = User.generatePassword();

  // New User Object
  const user = new User(data.email, password);

  // Save user to database
  const UserCollection = req.app.get("db").collection(collections.USERS);
  await UserCollection.insertOne(user);

  // Send Email
  sendSignupMail({ user, password });

  const response = {
    status: "success",
    code: "ok",
    message: "An email has been sent to your inbox for confirmation",
    user: { ...user, password: undefined },
  };

  return res.status(201).json(response);
});
