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
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be More than 10");
    }
    if (data?.about.split(" ").length > 250) {
      throw new Error("About cannot be More than 250 words");
    }
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }
    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("User Not Found");
    // } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

// Feed Api - Get /feed - get all users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

// Delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // const user = await User.findByIdAndDelete({ _id: userId });OR
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
  const data = req.body;
  const userID = req.params?.userId;

  try {
    // API with Options
    const ALLOWED_UPDATES = ["photoUrl", "gender", "age", "about", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be More than 10");
    }
    if (data?.about.split(" ").length > 250) {
      throw new Error("About cannot be More than 250 words");
    }
    const user = await User.findByIdAndUpdate(userID, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log(user);
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(400).send("Update Failed:" + err.message);
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
