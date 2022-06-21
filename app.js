const express = require("express");
const xss = require("xss-clean");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./routes").mainRouter;
const AppError = require("./utils/app.error");
const errorHandler = require("./middlewares/error.handler").errorHandler;

exports.initializeApp = () => {
  const app = express();

  // For Sanitizing User Input to Prevent XSS
  app.use(xss());

  // Request Logger
  app.use(morgan("tiny"));

  // Parse JSON request body
  app.use(express.json());

  // Parse URL Encoded request body
  app.use(express.urlencoded({ extended: true }));

  // Cross Origin Resource Sharing - So client side can make API request from different domain
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGINS,
    })
  );

  // Browsers send a pre-flight request before some http requests like DELETE, PUT to confirm whether to send actual requests
  app.options(
    cors({
      origin: process.env.ALLOWED_ORIGINS,
    })
  );

  // A middleware which sets multiple security headers
  app.use(helmet());

  app.get("/api", (req, res) => {
    return res.status(200).json({
      name: "Ropstam MERN Stack Test",
    });
  });

  //  Handle API Requests with Main Router
  app.use(mainRouter);

  // If no route matches the request, send 404
  app.use((req, res, next) => {
    next(
      new AppError(
        "url_not_found",
        `The url ${req.originalUrl} does not exist!`,
        404
      )
    );
  });

  // Universal Error Handler
  app.use(errorHandler);

  return app;
};
