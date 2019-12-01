const Trip = require("../models/trip");

module.exports = (req, res) => {
  console.log(req.headers);
  Trip.find({})
    .then(data => res.send(data))
    .catch(error => res.send(error));
};
