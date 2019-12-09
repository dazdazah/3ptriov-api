const Users = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  Users.findOne({ email: req.body.email })
    .select("email password avatar")
    .then(user => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let userObj = user.toObject();
        let token = jwt.sign(userObj, process.env.SECRET);
        res.send({ token: token });
      } else {
        res.send("error");
      }
    })
    .catch(err => res.send(err));
};
