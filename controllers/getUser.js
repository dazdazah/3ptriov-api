const Users = require("../models/users");

module.exports = (req, res) => {
  console.log(req.headers);
  Users.find({})
    .then(data => res.send(data))
    .catch(error => res.send(error));
};
