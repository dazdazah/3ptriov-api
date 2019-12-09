const Trip = require("../models/trip");
const User = require("../models/users");
const DataUri = require("datauri");
const path = require("path");
const dataUri = new DataUri();
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  let uri = dataUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  ).content;

  cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
  });

  cloudinary.uploader.upload(uri).then(cloudinaryFile => {
    req.body.picture = cloudinaryFile.url;
    // 1. Extract leader from token

    // 1.1 split token from bearer
    let token = req.headers.authorization.split(" ")[1];
    console.log({ token });

    // 1.2 verify the user and get a decoded user
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (decoded) {
        console.log({ decoded });
        User.findById(decoded._id).then(user => {
          console.log({ user });
          req.body.leader = "";
          req.body.leader = user._id;
          Trip.create(req.body)
            .then(data => {
              console.log("type of leader id", typeof data.leader);
              console.log({ data });
              res.send({ data });
            })
            .catch(err => {
              res.send({ err });
            });
        });
      }
    });

    // 1.3 find the user by id in the database

    // let leaderInfo = jwt.verify(req.body.token, process.env.SECRET);
    // User.findById(leaderInfo._id)
    //   .select("avatar")
    //   .then(user => {
    //     res.send(user);
    //   });
    //
    // // 2. Set req.body.leader to leader._id
  });
};
