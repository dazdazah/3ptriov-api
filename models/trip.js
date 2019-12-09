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
  },
  dates: {
    type: Date,
    default: Date.now,
    required: true
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = Trip;
