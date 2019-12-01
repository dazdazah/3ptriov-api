const mongoose = require("mongoose");

const Trip = mongoose.model("trip", {
  title: {
    type: String,
    required: [true, "title is required"]
  },
  description: {
    type: String,
    required: [true, "description is required"]
  },
  picture: {
    type: String,
    required: [true, "picture is required"]
  }
});

module.exports = Trip;
