require("dotenv").config();
const { connectToDBServer } = require("./db/connection");
const { initializeApp } = require("./app");

let server;

// Close the server gracefully
function exitHandler() {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}

function errorHandler(error, message) {
  console.log(message);
  console.error(error);
  exitHandler();
}

// Listeners to catch Uncaught Exceptions an Unhandled Promise Rejections
process.on("uncaughtException", (error) =>
  errorHandler(error, "Unexpected Error 💥")
);
process.on("unhandledRejection", (error) =>
  errorHandler(error, "Unhandled Promise Rejection Error 💥")
);

// Some production environments send SIGTERM signal to kill the server, We need to handler that and shutdown server gracefully
process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  exitHandler();
});

// Get PORT from env
if (isNaN(Number(process.env.PORT))) {
  throw new Error("PORT must be a number.");
}

const PORT = Number(process.env.PORT);

// Connect to Database Server
connectToDBServer((err, db) => {
  if (err) {
    throw err;
  }
  console.log("Connected to Database!");

  // Initialize express app after the database is connected
  const app = initializeApp();

  app.set("db", db);

  // Start server to listen for request
  server = app.listen(PORT, () => {
    console.log(
      `Server is listening on PORT ${PORT} - http://${process.env.HOSTNAME}`
    );
  });
});
