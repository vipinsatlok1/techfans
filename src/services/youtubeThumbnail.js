const fs = require("fs")
const download = require("image-downloader")
const grabLink = require('youtube-thumbnail-grabber')

const youtubeThumbnailDownload = async (req, res) => {
    // get youtube image url
    const url = grabLink(req.body.url, 'max')

    // set destination where save image
    const dest = __dirname + "/example.jpg"

    await download.image({ url, dest })
    res.download(dest, "download.jpg")
}

module.exports = {
    youtubeThumbnailDownload
}
