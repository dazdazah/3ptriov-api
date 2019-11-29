// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
//
// module.exports = (req, res) => {
// User.findOne({ email: req.body.email })
//   .then(match => {
//     if (match) {
//       res.send("error");
//     } else {
//       req.body.avatar = `${req.protocol}://${req.get("host")}/${
//         req.file.filename
//       }`;
//       req.body.password = bcrypt.hashSync(req.body.password, 10);
//       User.create(req.body).then(user => {
//         let userObj = user.toObject();
//         let token = jwt.sign(userObj, process.env.SECRET);
//         res.send({ token: token });
//       });
//     }
//   })
//   .catch(err => console.log(err));
// };
