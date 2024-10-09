const express = require("express");
const connectDb = require("./config/database");

// Creating an express instance / application of express / creating a server
const app = express();

connectDb()
  .then(() => {
    console.log("Database Connection Establshed");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database Connection Failed");
  });

// Listening on some port for getting incoming requests
