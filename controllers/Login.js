const Users = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  Users.findOne({ email: req.body.email })
    .select("email password avatar")
    .then(user => {
      if (!user) res.send("user or password incorrect dont log in!");
      else {
        let match = bcrypt.compareSync(req.body.password, user.password);
        if (match) {
          delete user.password;
          let obj = user.toObject();
          let token = jwt.sign(obj, process.env.SECRET);
          res.send({ token: token });
        } else {
          res.send("wrong password");
        }
      }
    })
    .catch(err => console.log(err));
};
