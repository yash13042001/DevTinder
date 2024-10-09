const express = require("express");
require("./config/database");

// Creating an express instance / application of express / creating a server
const app = express();

// Listening on some port for getting incoming requests
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
