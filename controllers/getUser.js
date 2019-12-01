const Users = require("../models/users.js");

module.exports = (req, res) => {
  console.log("req.params.id", req.params.id);
  Users.findById(req.params.id)
    .then(user => {
      console.log({ user });
      res.send(user);
    })
    .catch(error => res.send(error));
};
