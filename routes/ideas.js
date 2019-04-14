const express = require("express");
const router = express.Router();
const Idea = require("../models/Myjot");



router.get("/ideas/add", (req,res)=> {
    res.render("ideas/add")
})


router.get("/ideas", (req,res) => {
    Idea.find( {})
    .sort({date:"desc"})
    .then(ideas => {
        res.render("ideas/index", {
            ideas: ideas
        })
    })
})
router.get('/idea/edit/:id', (req, res) => {

    Idea.findOne({
      _id: req.params.id
    })
    .then(idea => {
      res.render('ideas/edit', {
        idea:idea
      });
    });
  });
router.post("/ideas", (req,res)=> {
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
            details: req.body.details
        })
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details
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
router.put("/ideas/:id", (req,res) => {
    
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
router.delete("/ideas/:id", (req,res)=> {

    Idea.remove({
        _id:req.params.id
    }, () => {
        req.flash("success_msg","Idea deleted")
        res.redirect("/ideas")
    }
)})


module.exports = router;