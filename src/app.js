const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

// Creating an express instance / application of express / creating a server
const app = express();

app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("User Logged In Successfully");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deltet a user");
});

// Listening on some port for getting incoming requests
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
