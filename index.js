const express = require("express");
const app = express();

// Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors({ credentials: true }));

require("dotenv").config();
require("./database");

// added multer
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// GET SECTION
app.get("/users", require("./controllers/getUsers"));
app.get("/user/:id", require("./controllers/getUser"));
app.get("/me", require("./controllers/getMe"));

app.get("/trip/:id", require("./controllers/getTrip"));
app.get("/trips", require("./controllers/getTrips"));

// POST SECTION
app.post("/signup", upload.single("file"), require("./controllers/Signup"));
app.post("/posttrip", upload.single("file"), require("./controllers/PostTrip"));
app.post("/login", require("./controllers/Login.js"));

//PATCH SECTION
app.patch("/trip/:id", require("./controllers/patchTrip"));

app.listen(process.env.PORT, () => {
  console.log(`Yo! Dazz you're on ${process.env.PORT}`);

  // PATCH SECTION
});
