const Trip = require("../models/trip.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  console.log("req.headers", req.headers.authorization);
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (decoded) {
      Trip.findById(req.params.id).then(tripOriginal => {
        console.log({ tripOriginal });
        tripOriginal.users.push(decoded._id);
        console.log("tripOriginal after pushing", tripOriginal);
        Trip.findByIdAndUpdate(req.params.id, tripOriginal)
          .then(trip => {
            res.send(trip);
          })
          .catch(error => res.send(error));
      });
    }
  });
};
