const Trip = require("../models/trip.js");

module.exports = (req, res) => {
  Trip.findByIdAndUpdate(req.params.id, req.body)
    .then(trip => {
      res.send(trip);
    })
    .catch(error => res.send(error));
};

// References from place
// const Place = require('../models/place.js')
//
// module.exports = (req, res) => {
// 	Place.findByIdAndUpdate(req.params.id, req.body)
// 	.then(data => {res.send(data)})
// 	.catch(err => {res.send(err)})
// }
