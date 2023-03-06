// require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 5000
// const passport = require("./passport")
// const session = require("express-session")
// const cookieParser = require('cookie-parser');
// const multer = require('multer')
const { youtubeThumbnailDownload } = require("techfans-tools")

app.set('view engine', 'ejs');


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

// app.use(express.json())
app.use(express.urlencoded({extended : false}))


app.post("/thumbnail", async (req, res) => {
    console.log(req.body)
    await youtubeThumbnailDownload(req.body.url, "example.jpg")
    res.send("ok").download("example.jpg")
})

// const upload = multer({ storage: storage })

// app.post('/file', upload.single('file'), function (req, res) {
//     // req.file is the name of your file in the form above, here 'uploaded_file'
//     // req.body will hold the text fields, if there were any 
//     console.log(req.file, req.body)
// });

// app.use(cookieParser());

// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true
// }));

// function isLoggedIn(req, res, next) {

//     if (req.cookies?.user) {
//         next();
//     } else {
//         res.redirect('/login');
//     }
// }

app.get('/', (req, res) => {
    res.render('pages/home', { title: 'Home' });
});


// app.get('/login', function (req, res) {
//     if (req.cookies?.user) return res.redirect("/")
//     res.sendFile(__dirname + "/login.html")
// });


// app.get('/login/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/login/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     function (req, res) {
//         res.cookie('user', req.user);
//         res.redirect('/');
//     });

// app.get('/logout', function (req, res) {
//     res.clearCookie("user")
//     res.redirect("/login")
// });


app.listen(port, () => console.log(`server start at port 5000`))