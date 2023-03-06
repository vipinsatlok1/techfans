const { loginWithGoogle, loignWithGoogleCallBack, logout } = require("../controllers/auth")
const router = require("express").Router()

router.get("/google", loginWithGoogle)
router.get("/google/callback", loignWithGoogleCallBack)
router.get("/logout", logout)

module.exports = router
