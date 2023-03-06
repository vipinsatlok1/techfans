const passport = require("passport")
const jwt = require("jsonwebtoken")

const loginWithGoogle = (req, res) => {
    if (req.cookies?.user) return res.redirect("/")
    res.render("pages/login")
}

const loignWithGoogleCallBack = () => {
    passport.authenticate('google', { failureRedirect: '/login' }),
        (req, res) => {

            // genrate payload
            const payload = {
                role: "user",
                email: req.user.emails[0].value
            }
            // create token
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1y" })
            res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 * 12 });
            res.redirect('/');
        };
}

const logout = (req, res) => {
    res.clearCookie("token")
    res.redirect("/login")
};

module.exports = {
    loignWithGoogleCallBack,
    loginWithGoogle,
    logout
}