# Setup Express JS

## install express js
```
npm install -g express
```

## Configure and Setup Express

- create a file index.js in projec folder on root copy below code put it in index.js file
```
const express = require('express')
const app = express()

// add middleware code

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.listen(3000)
```

## Run Server
- run this code `node .\index.js`
- then open browser type url http://localhost:3000
- now your server is start

## Install nodemon
- nodemon is a package for start server once
`npm install -g nodemon`

## Install and Setup ejs
- Install ejs
```npm install ejs```

- configure ejs copy below code put it in index.js above routes

```app.set("view engine", "ejs")```

- Create a `views` folder and create ejs files in `views` folder
- just like you create `index.ejs` file in `views` folder
- render ejs files inside route `res.send('Hello World')` send replace with render with ejs file
- just like `res.render('index')`

```
app.get('/', function (req, res) {
    res.render('index');
    // without .ejs
})
```

## setup express static files
- create `public` folder 
- create `stylesheets`, `javascripts` and `images` folder inside `public` folder
- add below in index.js file after `view engine` code
```
app.use(express.static("./public"));
```

## add middleware
- add middleware add below code to index.js file
- you can add single or multiple middleware
- copy below code and add in index.js file abvoe routes

```
app.use( function (req, res, next) {
    // add code here
    next();
});
```

## Express Generator

- with the help of express generator you will not neet to setup express js manually
- express generator will do all above task automatically
- Install `express-generator` globaly

```
$ npm install -g express-generator
```

# create New App anywhere with the help of express-generator
- open cmd move to desktop
- create new app with the help of below code
```
express appname --view=ejs
```
- then run `cd appname`
- then run `npm install`
 
# Sessions and Cookies
## Understanding sessions
- creating sessions, using sessions across routes and destroying sessions
- before use of session install express-session
- `npm install express-session`
- add this code `var session = require("express-session")` in index.js
- then add below code after this`view engine setup code`
```
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "holabholahola" // add custom name for Encryption/Decryption
}));
```
- create session just like `req.session.giveanyname = "any string value"`
- like create a session ``req.session.userbanned = true`
- check session `req.session` or `req.session.userbanned` return `true` and see below example

```
if(req.session.userBanned === true) {
    res.send("You are banned!");
  } else {
    res.send("You are not banned!");
  }
```

- remove session see below code

```
req.session.destroy(function(err){
    if (err) throw err;
    res.send("User ban removed!");
});
```

## Understanding cookies
- creating cookies, using cookies across routes and destroying cookies
- before use of session install cookie-parser
- `npm install cookie-parser`
- add this code `var cookieParser = require("cookie-parser")` in index.js
- and add this also `app.use(cookieParser())`
- if you using `express-generator` ignore above cookie setup
- set cookie i.e `res.cookie("name", value);` set cookie name with double quote
- cookie reading `req.cookies.age` read with name by age
- clear cookie `res.clearCookie("age");` give cookie name want to clear


# Learn Mongo DB

-   Code Side       >>  Mongo DB Side
-   DB Setup (code) >>  Formation (db)
-   Model (code)    >>  Collection (db)
-   Schema (code)   >>  Documents (db)
   
-   install mongodb
-   install monoose js like `npm install mongoose`
-   require and setup connection
-   make schema
-   create model and export
-   


# git setup
## create a new repository on the command line

```
echo "# advexpressjs" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/warisdev5/advexpressjs.git
git push -u origin main
```

## or push an existing repository from the command line
```
git remote add origin https://github.com/warisdev5/advexpressjs.git
git branch -M main
git push -u origin main
```
