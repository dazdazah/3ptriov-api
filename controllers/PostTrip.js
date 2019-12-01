const Trip = require("../models/trip");
const DataUri = require("datauri");
const path = require("path");
const dataUri = new DataUri();
const cloudinary = require("cloudinary");

module.exports = (req, res) => {
  console.log("req.body", req.body);
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
    Trip.create(req.body)
      .then(data => {
        res.send({ data });
      })
      .catch(err => {
        res.send({ err });
      });
  });
};
