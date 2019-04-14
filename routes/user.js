const express = require("express");
const router = express.Router();
const Idea = require("../models/Myjot");

router.get("/login", (req,res) => {
    res.render("users/login")
})

router.get("/register", (req,res) => {
    res.render("users/register")
})

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
    }
})
module.exports = router;