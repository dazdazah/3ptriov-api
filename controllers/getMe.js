const Users = require("../models/users.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (decoded) {
      Users.findById(decoded._id)
        .then(me => {
          res.send(me);
        })
        .catch(err => {
          res.send(err);
        });
    }
  });
};
