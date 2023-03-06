// const download = require("image-downloader")
const grabLink = require('youtube-thumbnail-grabber')
const path = require("path")


// const S3FS = require('cyclic-s3fs');
// const s3fsImpl = new S3FS('your-bucket-name', {
//     accessKeyId: 'ASIAZH3CGN34Q3X7DAIR',
//     secretAccessKey: 'fnDttvD1i5dh4VGh8KjSexGJTFc3rVohFvM4f1tM'
// });

// const fs = require('@cyclic.sh/s3fs')("cyclic-agreeable-blue-peplum-ap-south-1", {
//     accessKeyId: 'ASIAZH3CGN34Q3X7DAIR',
//     secretAccessKey: 'fnDttvD1i5dh4VGh8KjSexGJTFc3rVohFvM4f1tM'
// })

const fs = require('@cyclic.sh/s3fs')
// { createWriteStream }

// export AWS_REGION="ap-south-1"
// export AWS_ACCESS_KEY_ID="ASIAZH3CGN34Q3X7DAIR"
// export AWS_SECRET_ACCESS_KEY="fnDttvD1i5dh4VGh8KjSexGJTFc3rVohFvM4f1tM"
// export AWS_SESSION_TOKEN="IQoJb3JpZ2luX2VjEFoaCmFwLXNvdXRoLTEiSDBGAiEAoV1bHi7jbe73fu7pdtwkMT4YzrmwM6oRJkxeSNAE4XQCIQDcLRXUc8BnaKT/cuxuTW2tFtvU1T0Y/9/f5wfIzwWE2iqvAggTEAAaDDYzNTMyNDIzMTQxNyIMD9lpZikf2K6W/hV9KowCNBCwisttJhRhpWAplVXeB+4hQFEp9hddV4COYPmGqqcc2XpTk1MZxw3wPBv8FhlDTriQkCUjNaz1a1ul2APtICQThaqnnc5zdgj3Hj8/p4E1C+nBQ0XzqV3ZJIIfWEn5FwP8HIgKWOrkyrfEGnZUSii6E/GlrlaoK4nUHBAI1m9hf0YzsTik9uOTec80LEO9Iq6EHjZUYSP78gBp0qkDvZxzyIDgmXfZ4+wxB2ZL2zLtKUjb/h7opICr9GxcDHK+3g0SCYAF50t5LbIsZ2t4toM+gnS9Dr9WQ03QhBEIJdGC1Vj39VLqC2jcSM9grhaIfjTbf+Ek4sgki85efOV/d78IfKpJ6KLJcnTO/TCF8pagBjqcAcAh80fAnE/MDgb9VEmkI7slsw2DzA9lCo7O58yHz8tzQkuaxUYMCrAfWmNuPxYCizrGmDrktVcSoYSgROWGh8J7Nw7yNb3IJCYqcru6Zs5PnczpZr0S8hjq1sraOI71AYwHbAAzHaj5fT77FH6/oZa6sRxlIdVRzvsgW1gsfmTcEIZT/RJHUTyHNLhNnKinTGxXhEMvsDaASaUdqA=="

const { http, https } = require('follow-redirects');


const download = (url, path, callback) => {

    console.log(require('@cyclic.sh/s3fs'))
    const file = fs.createWriteStream(path);
    const request = url.trimLeft().startsWith('https') ? https : http;

    request.get(url, (res) => {
        res.pipe(file);
        file.on('finish', () => {
            file.close(() => {
                callback(null);
            });
        });
    }).on('error', (err) => {
        fs.unlink(path);
        if (callback) callback(err.message);
    });
};

const youtubeThumbnailDownload = async (req, res) => {
    // get youtube image url
    const url = grabLink(req.body.url, 'max')

    // set destination where save image
    const dest = path.join(__dirname, "..", "..", "tmp", "example.jpg")

    // fs.readFile("index.js", (err, data) => {
    //     console.log(data)
    // })
    await download(url, dest, (err) => {
        if (err) return res.send(err)
        res.download(dest, "download.jpg")
    })
}

module.exports = {
    youtubeThumbnailDownload
}