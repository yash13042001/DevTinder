const express = require("express");

// Creating an express instance / application of express / creating a server
const app = express();

// Handling Code

// This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Yash", lastName: "Shukla" });
});

app.post("/user", (req, res) => {
  // saving data to DB
  res.send("Data successfully saved to database!");
});

app.delete("/user", (req, res) => {
  // deleting data from DB
  res.send("Deleted successfully!");
});

// this will match all the HTTP methods API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

// Listening on some port for getting incoming requests
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
