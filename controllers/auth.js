const { catchAsync } = require("../utils/catch.async");
const { collections } = require("../db/collections");
const AppError = require("../utils/AppError");
const User = require("../models/User");
const { sendSignupMail } = require("../utils/email");
const responseCodes = require("../utils/response.codes");

exports.signup = catchAsync(async (req, res, next) => {
  //   If a user is logged in, Don't allow them to signup
  if (req.currentUser) {
    return next(
      new AppError(
        responseCodes.ALREADY_LOGGED_IN,
        "You are already logged in.",
        403
      )
    );
  }

  // If there is any validation error from Joi, then return an AppError
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
    code: responseCodes.OK,
    message: "An email has been sent to your inbox with credentials",
    user: { ...user, password: undefined },
  };

  return res.status(201).json(response);
});

exports.login = catchAsync(async (req, res, next) => {
  if (req.currentUser) {
    return next(
      new AppError(
        responseCodes.ALREADY_LOGGED_IN,
        "You are already logged in.",
        403
      )
    );
  }

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

  // Get user from database
  const UserCollection = req.app.get("db").collection(collections.USERS);
  const user = await UserCollection.findOne({
    email: data.email,
  });

  if (!user) {
    return next(
      new AppError(responseCodes.INVALID_CREDENTIALS, "User doesn't exist", 401)
    );
  }

  // Check if password is incorrect
  if (!(await User.comparePassword(data.password, user.password))) {
    return next(
      new AppError(
        responseCodes.INVALID_CREDENTIALS,
        "Password is incorrect",
        401
      )
    );
  }

  // Create JWT for User
  const jwt = User.signJWT(user._id);

  const response = {
    status: "success",
    code: responseCodes.AUTHENTICATED,
    message: "Login successful",
    user: {
      ...user,
      password: undefined,
    },
    jwt,
  };

  return res.status(200).json(response);
});

exports.logout = (req, res) => {
  const response = {
    status: "success",
    code: responseCodes.LOGGED_OUT,
    message: "Logout successful",
  };

  return res.status(200).json(response);
};
