const express = require("express");
const app = express();
const exphbs  = require('express-handlebars');
const mongoose = require("mongoose");
const Idea = require("./models/Myjot")
const port = 5000;
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/myjot", {useNewUrlParser: true})
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get("/", (req,res)=> {
    res.render("index")
})


app.get("/about", (req,res) => {
    res.render("about")
})


app.listen(port, () => {
    console.log(`Segrver is listening at ${port}`)
})