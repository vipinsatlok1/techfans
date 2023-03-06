const { youtubeThumbnailDownload } = require("../services/youtubeThumbnail");
const router = require("express").Router()

router.post('/youtbethumbnail', youtubeThumbnailDownload);

module.exports = router