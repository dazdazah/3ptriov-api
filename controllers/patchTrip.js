const Trip = require("../models/trip.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (decoded) {
      Trip.findById(req.params.id).then(tripOriginal => {
        if (tripOriginal.users.length <= 3) {
          //Working till here 1
          if (tripOriginal.users[0]) {
            //Working till here 2
            tripOriginal.users.forEach(user => {
              console.log({ user });
              console.log("decoded._id", decoded._id);
              console.log(user != decoded._id);
              //Working till here 3
              if (String(user) != decoded._id) {
                tripOriginal.users.push(decoded._id);
                Trip.findByIdAndUpdate(req.params.id, tripOriginal, {
                  new: true
                }).then(tripUpdated => {
                  console.log({ tripUpdated });
                });
                //Work till here 4
              } else {
                console.log("User already in the trip");
              }
            });
          } else {
            //It is properly adding the decoded._id to thetripOriginal.users
            tripOriginal.users.push(decoded._id);
            // tripOriginal.save((err, savedTrip) => {
            //   if (err) {
            //     res.send({ err });
            //   } else {
            //     res.send(savedTrip);
            //   }
            // });
            Trip.findByIdAndUpdate(req.params.id, tripOriginal, {
              new: true
            }).then(tripUpdated => {
              console.log({ tripUpdated });
            });
          }
        }
      });
    }
  });
};

//
// 						if (user != decoded._id) {
// 							console.log({ tripOriginal });
// 							tripOriginal.users.push(decoded._id);
// 							console.log("tripOriginal after pushing", tripOriginal);
// 							Trip.findByIdAndUpdate(req.params.id, tripOriginal)
// 								.then(trip => {
// 									res.send(trip);
// 								})
// 								.catch(error => res.send(error));
// 						}
// 					});
// 				} else {

// 					tripOriginal.users.push(decoded._id);
// 					console.log("tripOriginal after pushing", tripOriginal);
// 					Trip.findByIdAndUpdate(req.params.id, { tripOriginal })
// 						.then(trip => {
// 							console.log({ trip });
// 							res.send(trip);
// 						})
// 						.catch(error => res.send(error));
// 				}
// 			}
