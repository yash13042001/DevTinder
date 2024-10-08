const express = require("express");

// Creating an express instance / application of express / creating a server
const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling the route user");
    // res.send("Response!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2");
    // res.send("Response 2!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 3");
    // res.send("Response 3!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 4");
    res.send("Response 4!!");
    // next();
  }
);

// Listening on some port for getting incoming requests
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
