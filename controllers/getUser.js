const Users = require("../models/users.js");

module.exports = (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      res.send(user);
    })
    .catch(error => res.send(error));
};
