const express = require("express");
const router = express.Router();
const Idea = require("../models/Myjot");
const {ensureAuthenticated} = require("../helper/auth")

router.get("/ideas/add", ensureAuthenticated, (req,res)=> {
    res.render("ideas/add")
})


router.get("/ideas",ensureAuthenticated, (req,res) => {
    Idea.find( {user: req.user.id})
    .sort({date:"desc"})
    .then(ideas => {
        res.render("ideas/index", {
            ideas: ideas
        })
    })
})
router.get('/idea/edit/:id',ensureAuthenticated, (req, res) => {

    Idea.findOne({
      _id: req.params.id
    })
    .then(idea => {

        if(idea.user != req.user.id) {
            req.flash("error_msg", "Not authorized")
            res.redirect("/ideas")
        } else {
            res.render('ideas/edit', {
                idea:idea
              });
        } 
    });
  });
router.post("/ideas",ensureAuthenticated, (req,res)=> {
    console.log(req.body)
    const errors = [];

    if(!req.body.title){
        errors.push({text:"Please add a title"})
    }
    if(!req.body.details){
        errors.push({text:"Please add details"})
    }

    if(errors.length > 0) {
        res.render("ideas/add", {
            errors: errors,
            title: req.body.title,
            details: req.body.details,
            // user: req.user.id
        })
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details,
             user: req.user.id
        }
        new Idea(newUser)
        .save()
        .then(idea => {
            req.flash("success_msg","Idea added")
            res.redirect("/ideas")
        })
    }
})


// Update form
router.put("/ideas/:id",ensureAuthenticated, (req,res) => {
    
    Idea.findOne({
        _id: req.params.id
    }).then(ideas => {
        ideas.title = req.body.title,
        ideas.details = req.body.details,
        ideas.save().then(ideas => {
            req.flash("success_msg","Idea edited")

            res.redirect("/ideas")
        })
    })
})

// Delete form
router.delete("/ideas/:id", ensureAuthenticated,(req,res)=> {

    Idea.remove({
        _id:req.params.id
    }, () => {
        req.flash("success_msg","Idea deleted")
        res.redirect("/ideas")
    }
)})


module.exports = router;