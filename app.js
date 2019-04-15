const express = require("express");
const app = express();
const exphbs  = require('express-handlebars');
const mongoose = require("mongoose");
const Idea = require("./models/Myjot")
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const ideas = require("./routes/ideas");
const path = require("path");
const user = require("./routes/user");
const passport = require("passport");
mongoose.Promise = global.Promise;


// Passport Config
require('./config/passport')(passport);

mongoose.connect("mongodb://localhost/myjot", {  useMongoClient: true,
useNewUrlParser: true})
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave:true
  }));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
 
// Global variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });
  
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(ideas);
app.use(user);

app.get("/", (req,res)=> {
    res.render("index")
})


app.get("/about", (req,res) => {
    res.render("about")
})

const port = 5000;


app.listen(port, () => {
    console.log(`Server is listening at ${port}`)
})