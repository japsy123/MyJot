if(process.env.NODE_ENV === "production") {
    module.exports = {
        mongoURI: "mongodb+srv://myjot:myjotfirst@cluster0-hdkek.mongodb.net/test?retryWrites=true"
    }

} else {
    module.exports = {
        mongoURI: "mongodb://localhost/myjot"

    }
}