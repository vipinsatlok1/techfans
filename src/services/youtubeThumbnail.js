// const download = require("image-downloader")
const grabLink = require('youtube-thumbnail-grabber')
const path = require("path")

let fs
if (NODE_ENV = "development") {
    const { createWriteStream } = require('fs');
    fs = createWriteStream
} else {
    const { createWriteStream } = require('@cyclic.sh/s3fs')
    fs = createWriteStream
}

const { http, https } = require('follow-redirects');

const download = ({ url, dest, ...options }) => new Promise((resolve, reject) => {
    const request = url.trimLeft().startsWith('https') ? https : http;

    request
        .get(url, options, (res) => {
            if (res.statusCode !== 200) {
                // Consume response data to free up memory
                res.resume();
                reject(new Error('Request Failed.\n' +
                    `Status Code: ${res.statusCode}`));

                return;
            }

            res.pipe(fs(dest))
                .on('error', reject)
                .once('close', () => resolve({ filename: dest }));
        })
        .on('error', reject);
});

const youtubeThumbnailDownload = async (req, res) => {
    // get youtube image url
    const url = grabLink(req.body.url, 'max')

    // set destination where save image
    const dest = path.join(__dirname, "..", "..", "tmp", "example.jpg")

    await download({ url, dest })
    res.download(dest, "download.jpg")
}

module.exports = {
    youtubeThumbnailDownload
}