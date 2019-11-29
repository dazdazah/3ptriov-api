const express = require("express");
const app = express();

// Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors({ credentials: true }));

require("dotenv").config();
// require("./database");

app.listen(process.env.PORT, () => {
  console.log(`Yo! Dazz you're on ${process.env.PORT}`);
});
