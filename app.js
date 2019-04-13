const express = require("express");
const app = express();
const exphbs  = require('express-handlebars');
const mongoose = require("mongoose");
const Idea = require("./models/Myjot")
const bodyParser = require("body-parser");
const port = 5000;
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/myjot", {useNewUrlParser: true})
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get("/ideas/add", (req,res)=> {
    res.render("ideas/add")
})

app.post("/ideas", (req,res)=> {
    console.log(req.body)
})
app.get("/", (req,res)=> {
    res.render("index")
})


app.get("/about", (req,res) => {
    res.render("about")
})




app.listen(port, () => {
    console.log(`Segrver is listening at ${port}`)
})