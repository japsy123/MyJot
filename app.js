const express = require("express");
const app = express();
var exphbs  = require('express-handlebars');

const port = 5000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get("/", (req,res)=> {
    res.send("Index")
})


app.get("/about", (req,res) => {
    res.send("about")
})


app.listen(port, () => {
    console.log(`Segrver is listening at ${port}`)
})