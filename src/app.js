const express = require("express");
const connectDb = require("./config/database");

// Creating an express instance / application of express / creating a server
const app = express();

const User = require("./models/user");
const { validateSignUpData, validateLoginData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // Validation of Data

    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    // Creating new instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    validateLoginData(req);

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // Create a jwt Token
      const token = jwt.sign({ _id: user._id }, "DEV@Tinder$790");
      // console.log(token);

      // Add the token to the cookie and send back response to the user
      res.cookie("token", token);
      res.send("Login Successfull!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    // Validate the token
    const decodedMessage = jwt.verify(token, "DEV@Tinder$790");
    // console.log(decodedMessage);
    const { _id } = decodedMessage;
    // console.log("Logged In User is : " + _id);

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }
    // console.log(cookies);
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
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
    if (data?.about?.split(" ").length > 250) {
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
    // Listening on some port for getting incoming requests
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database Connection Failed");
  });
