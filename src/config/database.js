const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://shuklayash1304:Yash1304@yashcluster.9e4xf.mongodb.net/?retryWrites=true&w=majority&appName=yashcluster/devTinder"
  );
};

module.exports = connectDb;
