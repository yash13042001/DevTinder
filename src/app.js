const express = require("express");
const connectDb = require("./config/database");

// Creating an express instance / application of express / creating a server
const app = express();

const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating new instance of User model
  // console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

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
