// const passport = require("passport")
// const GoogleStrategy = require("passport-google-oauth20").Strategy

// const secretData = {
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_URL
// }

// const getUserData = (accessToken, refreshToken, profile, done) => {
//     return done(null, profile);
// }

// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });

// passport.use(new GoogleStrategy(secretData, getUserData));

// module.exports = passport