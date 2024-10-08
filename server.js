//-------------------------------
// Importing Required Modules
//-------------------------------
const express = require("express");
const mongoose = require('mongoose');

//-------------------------------
// Initializing Express App
//-------------------------------
const app = express();
app.use(express.json());
//-------------------------------
// Database Connection (MongoDB)
//-------------------------------
mongoose.connect('mongodb://localhost:27017/my-rest-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Handling connection error
db.on('error', (err) => {
  console.log("Database Connection Error:", err);
});

// Confirming successful connection
db.once('open', () => {
  console.log("Database Connection Established");
});

//-------------------------------
// Importing Routes
//-------------------------------

const userRoute = require('./api/routes/user');

//-------------------------------
// Middleware to Use Routes
//-------------------------------
 // Routes related to 'apple' under 'fruits'
app.use("/api/users", userRoute);        // Routes for user-related operations

//-------------------------------
// Default Route
//-------------------------------
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

//-------------------------------
// Starting the Server
//-------------------------------
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
