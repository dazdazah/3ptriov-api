const Trip = require("../models/trip");

module.exports = (req, res) => {
  Trip.find({})
    .populate({
      path: "leader",
      select: "firstName avatar"
    })
    .lean()
    .then(data => {
      res.send(data);
    })
    .catch(error => res.send(error));
};
