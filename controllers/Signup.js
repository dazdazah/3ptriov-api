const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DataUri = require("datauri");
const path = require("path");
const dataUri = new DataUri();
const cloudinary = require("cloudinary");

module.exports = (req, res) => {
  console.log("req.file", req.file);
  let uri = dataUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  ).content;

  cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
  });

  cloudinary.uploader
    .upload(uri)
    .then(cloudinaryFile => {
      console.log({ cloudinaryFile });
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
      } else {
        res.send({ error: "password is required" });
      }
      req.body.avatar = cloudinaryFile.url;

      Users.create(req.body)
        .then(data => {
          console.log({ data });
          let token = jwt.sign(data.toObject(), process.env.SECRET);
          res.send(token);
        })
        .catch(err => {
          res.send({ err });
        });
    })
    .catch(err => {
      console.log({ err });
    });
};
