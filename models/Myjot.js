const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//  Creating Schema

const IdeaSchema = mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    details: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const myjot = mongoose.model("ideas",IdeaSchema)

module.exports = myjot;