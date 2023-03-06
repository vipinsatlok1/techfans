const fs = require("fs")
const download = require("image-downloader")
const grabLink = require('youtube-thumbnail-grabber')
const path = require("path")

const youtubeThumbnailDownload = async (req, res) => {
    // get youtube image url
    const url = grabLink(req.body.url, 'max')

    // set destination where save image
    const dest = path.resolve(__dirname, "../../", "example.jpg")

    await download.image({ url, dest })
    res.download(dest, "download.jpg")
}

module.exports = {
    youtubeThumbnailDownload
}