var express = require('express');
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.userBanned = true; // create session
  res.render('index', { title: 'Learn Node Js' });
});

router.get("/contact", function(req, res, next) {
  console.log(req.session); // check saved session
  console.log(req.session.userBanned); // Check the saved session with the name that was given when creating the session
  
  if(req.session.userBanned === true) { // check session value
    res.send("You are banned!");
  } else {
    res.send("You are not banned!");
  }
});

router.get("/removeban", function(req, res, next){
  req.session.destroy(function(err){
    if (err) throw err;
    res.send("User ban removed!");
  });
});

// setup cookie
router.get("/setcookie", function(req, res, next){
  res.cookie("age", 25); // set cookie
  res.send("cookie is set");
});

// read cookie
router.get("/readcookie", function(req, res, next){
  console.log(req.cookies.age);
  res.send("read cookie in console");
});

// delete cookie
router.get("/clearcookie", function(req, res, next){
  res.clearCookie("age"); // give cookie name want to clear
  res.send("cookie is clear");
});

router.get("/create", async function(req, res, next) {
  const createdUser = await userModel.create({
      username: "warisdev5",
      name: "Muhammad Waris",
      age: 39
    });
    console.log(createdUser);
    res.send(createdUser);
});

router.get("/allusers", async function(req, res, next) {
  // let allUsers = await userModel.find();
  let allUsers = await userModel.findOne({username : "warisdev5"});
  console.log(allUsers);
  res.send(allUsers);
});

router.get("/delete", async function(req, res, next) {
  // let allUsers = await userModel.find();
  let deltedUser = await userModel.findOneAndDelete({
    username : "warisdev5"
  });
  console.log(deltedUser);
  res.send(deltedUser);
});

module.exports = router;
