const express = require("express")
const app = express()
const passport = require("./src/passport")
const session = require("express-session")
const cookieParser = require('cookie-parser');
const fs = require("fs")
const download = require("image-downloader")

// setting view engen
app.set('view engine', 'ejs');


// use middlwares for parse daat to json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// use cookie parser for parse cookie
app.use(cookieParser())

// uses session
app.use(session({
    secret: process.env.SESSION_SECRET || "satsahebji",
    resave: false,
    saveUninitialized: true
}));

app.post("/thumbnail", async (req, res) => {
    const url = grabLink(req.body.url, 'max')
    const dest = __dirname + "/example.jpg"

    const image = await download.image({ url, dest })
    res.download(dest, "download.jpg")
});


// render page
const pages = require("./src/routes/pages")
// const auth = require("./src/routes/auth")
const services = require("./src/routes/services")
app.use("/", pages)
// app.use("/auth", auth)
app.use("/services", services)


module.exports = app