const Trip = require("../models/trip.js");

module.exports = (req, res) => {
  Trip.findById(req.params.id)
    .populate({
      path: "users",
      select: "firstName avatar"
    })
    .lean()
    .then(trip => {
      res.send(trip);
    })
    .catch(error => res.send(error));
};
