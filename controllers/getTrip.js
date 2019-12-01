const Trip = require("../models/trip.js");

module.exports = (req, res) => {
  Trip.findById(req.params.id)
    .then(trip => {
      console.log({ trip });
      res.send(trip);
    })
    .catch(error => res.send(error));
};
