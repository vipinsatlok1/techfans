require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const passport = require("./passport")
const session = require("express-session")
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

function isLoggedIn(req, res, next) {

    if (req.cookies?.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/', isLoggedIn, function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.get('/login', function (req, res) {
    if (req.cookies?.user) return res.redirect("/")
    res.sendFile(__dirname + "/login.html")
});


app.get('/login/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/login/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.cookie('user', req.user);
        res.redirect('/');
    });

app.get('/logout', function (req, res) {
    res.clearCookie("user")
    res.redirect("/login")
});


app.listen(port, () => console.log(`server start at port 5000`))