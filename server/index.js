// Importing necessary modules
const express = require("express"); // Importing the Express module to create the server
const mongoose = require("mongoose"); // Importing Mongoose to interact with MongoDB
const cors = require("cors"); // Importing CORS to handle cross-origin requests
require("dotenv").config(); // Loading environment variables from a .env file

// Importing custom modules and middlewares
const database = require("./config/database"); // Importing the database configuration and connection
const cookieParser = require("cookie-parser"); // Importing cookie-parser to handle cookies
const routes = require("./routes/route"); // Importing all routes from the common route file

// Initializing the Express application
const app = express();
const PORT = process.env.PORT || 5000; // Defining the port from environment variables or using 5000 as default

// Middlewares
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cookieParser()); // Middleware to parse cookies
app.use(
  cors({
    origin: "*", // Allowing all origins to access the server
    credentials: true, // Allowing credentials (cookies, authorization headers) to be included in requests
  })
);

// Connecting to the database
database.connect(); // Calling the connect function from the database configuration to connect to MongoDB

// Testing the server
app.get("/", (req, res) => {
  // Defining a GET route for the root URL
  return res.json({
    success: true,
    message: "Your server is up and running ...", // Sending a success message as JSON response
  });
});

// Using the common route file for API endpoints
app.use("/v1", routes); // All API routes are prefixed with /api

// Listening to the server
app.listen(PORT, () => {
  // Starting the server and listening on the specified port
  console.log(`App is listening at ${PORT}`); // Logging a message indicating the server is running
});

// End of code.
