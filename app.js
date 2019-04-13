const express = require("express");
const app = express();
const port = 5000;


app.get("/", (req,res)=> {
    res.send("Index")
})


app.get("/about", (req,res) => {
    res.send("about")
})


app.listen(port, () => {
    console.log(`Segrver is listening at ${port}`)
})