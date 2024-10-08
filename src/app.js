const express = require("express");

// Creating an express instance / application of express / creating a server
const app = express();

// Handling Code

app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello!!!");
});

app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

app.use("/", (req, res) => {
  res.send("Hello from the dashboard..");
});

// Listening on some port for getting incoming requests
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
