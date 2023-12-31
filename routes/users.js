// var express = require('express');
// var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

// const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/learnjsdb");

/* const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: Number
}) */

/* const userSchema = mongoose.Schema({
  username: String,
  nickname: String,
  description: String,
  categories: {
    type: Array,
    default: []
  },
  datecreated: {
    type: Date,
    default: Date.now()
  }
}); */

const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/tesinglogin");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  secret: String
})

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);