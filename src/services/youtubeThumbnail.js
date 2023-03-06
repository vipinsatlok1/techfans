const fs = require("fs")
const download = require("image-downloader")
const grabLink = require('youtube-thumbnail-grabber')
const path = require("path")

const youtubeThumbnailDownload = async (req, res) => {
    // get youtube image url
    console.log(req.body.url)
    const url = grabLink(req.body.url, 'max')

    console.log(url)
    // set destination where save image
    const dest = path.join(__dirname, "..", "..", "tmp", "example.jpg")
    console.log(dest)

    await download.image({ url, dest })
    res.download(dest, "download.jpg")
}

module.exports = {
    youtubeThumbnailDownload
}
