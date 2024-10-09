const express = require("express");
// const { adminAuth, userAuth } = require("./middlewares/auth");

// Creating an express instance / application of express / creating a server
const app = express();

app.get("/getUserData", (req, res) => {
  // try {
    throw new Error("ahdshdb");
    res.send("User Data Sent");
  // } catch (err) {
    res.status(500).send("Somehting Went Wrong 2");
  // }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    // Log Error
    res.status(500).send("Something Went Wrong");
  }
});

// Listening on some port for getting incoming requests
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
