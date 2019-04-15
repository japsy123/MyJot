const express = require("express");
const router = express.Router();
const Idea = require("../models/Myjot");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

router.get("/login", (req,res) => {
    res.render("users/login")
})

router.get("/register", (req,res) => {
    res.render("users/register")
})
// Login Form POST
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect:'/ideas',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  });
router.post("/user/register", (req,res) => {
    const errors = [];
    console.log(req.body.password.length)

    if(req.body.password !== req.body.password2) {
        errors.push({
            text: "Password dont match"
        })
    }
    if(req.body.password.length < 4) {
        errors.push({
            text: "Please enter larger password"
        })
    }
    if(errors.length > 0 ){
        res.render("users/register", {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        })
    } else {
        User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                req.flash("error_msg", "Email already registered!");
                res.redirect("/register")
            }
            else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err,salt)=> {
                    bcrypt.hash(newUser.password, salt, (err,hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user => {
                            req.flash("success_msg", "You are now registered");
                            res.redirect("/login")
                        })
                        .catch(err => {
                            console.log(err)
                            return;
                        })
                    })
                })
            }
        })
        
    }
})
module.exports = router;