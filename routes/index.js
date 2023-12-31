var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require('passport');

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('register');
});

/* router.get('/', function(req, res, next) {
  req.session.userBanned = true; // create session
  res.render('index', { title: 'Learn Node Js' });
}); */

router.get("/home2", function(req,res,next) {
  res.render("index1");
});

router.get("/failed", function(req,res,next) {
  req.flash("age", 12);
  req.flash("name", "Waris");
  res.send("flash data ban gaya");
});

router.get("/flashcheck", function(req,res,next) {  
  console.log(req.flash("age"), req.flash("name"));
  
  res.send("check terminal console");
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
  let allUsers = await userModel.find();
  // let allUsers = await userModel.findOne({username : "warisdev5"});
  console.log(allUsers);
  res.send(allUsers);
});

router.get("/delete", async function(req, res, next) {
  
  let deltedUser = await userModel.findOneAndDelete({
    username : "warisdev5"
  });
  console.log(deltedUser);
  res.send(deltedUser);
});

router.get("/ncreate", async function(req, res, next){
  /* let userdata = await userModel.create({
    username: "warisdev5",
    nickname: "waris",
    description: "I'm a guy of 34 and i love everything about js, mode and react",
    categories: ['js', 'node', 'react', 'gsap', 'modern animation'],
  }); */

  let userdata = await userModel.create({
    username: "yasmeen",
    nickname: "jasmin",
    description: "Hellow Every One, I'm a Student of fine art",
    categories: ['game', 'tv', 'sports'],
  });

  res.send(userdata);
});

router.get("/finduser", async function(req, res) {
  // new RegExp(search, flags);
  // let regexp = new RegExp('yasm', 'i');
  // add start with (^) and with ($) like see below 
  // let regexp = new RegExp('^yasmeen$', 'i');
  // let user = await userModel.find({username: regexp}); // search with username value
  // let user = await userModel.find({categories: { $all: ['fashion'] } }); // find with category
  // let user = await userModel.find(); // find all data

  // let date1 = new Date('2023-12-22');
  // let date2 = new Date('2023-12-23');
  // let user = await userModel.find({datecreated: {$gte: date1, $lte: date2 } }) // find with dates

  // let user = await userModel.find({ categories: { $exists: true } }); // fetch data with existing field

  let user = await userModel.find({
    $expr: {
      $and: [
        { $gte: [{ $strLenCP: '$nickname'}, 0]},
        { $lte: [{ $strLenCP: '$nickname'}, 5]}
      ]
    }
  });

  res.send(user);
});

router.get('/profile', isLoggedIn, function(req, res) {
  res.send('Welcome to Profile');
});

router.post('/register', function(req, res) {

  let userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret
  });

  userModel.register(userdata, req.body.password)
    .then(function(registereduser) {
      passport.authenticate("local")(req, res, function(){
        res.redirect('/profile')
      })
    })
});

router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login"
}), function(req, res) {});

router.get("/logout", function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
