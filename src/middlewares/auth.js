const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from request cookies
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid!!!!!!");
    }
    // Validate the token
    const decodedMessage = jwt.verify(token, "DEV@Tinder$790");
    // Find the user
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not Found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = { userAuth };
