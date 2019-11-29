const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGODB_URI, error => {
//   error ? console.log(error) : console.log("Connected to mongoDB");
// });

mongoose.connect("mongodb://localhost:27017/3ptrio", error => {
  error ? console.log(error) : console.log("Connected to mongoDB");
});

module.export = mongoose;
