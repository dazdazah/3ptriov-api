const mongoose = require("mongoose");

const Users = mongoose.model("users", {
  firstName: {
    type: String,
    required: [true, "firstName is required"]
  },
  lastName: {
    type: String,
    required: [true, "firstName is required"]
  },
  email: {
    type: String,
    required: [true, "email is required"]
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  description: {
    type: String
  },
  avatar: {
    type: String
  }
});

module.exports = Users;
