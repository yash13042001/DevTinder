const express = require("express");

// Creating an express instance / application of express / creating a server
const app = express();

app.use("/", (req, res, next) => {
  next();
});

app.get(
  "/user",
  (req, res, next) => {
    console.log("Handling the route user");
    next();
  },
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    res.send("2 Route Handler");
  }
);

// Listening on some port for getting incoming requests
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
