const AWS = require('aws-sdk');
const { body } = require('min-document');

AWS.config.update({
    region: 'us-east-1'
})

const BUCKET = "nanoservices-imagens-thumbnail"

const s3 = new AWS.S3();

const getObject = (bucket, key) =>{
    return new Promise((res, rej) => {
        s3.getObject({
            Bucket: bucket,
            Key: key
        }, (err, data) => {
            if(err){
                return rej(err);
            }
            return res(data.Body)
        })
    });
}

const putObject = (buffer, key) =>{
    return new Promise((res, rej) => {
        s3.putObject({
            Bucket: BUCKET,
            Key: 'thumbnail-'+key,
            Body: buffer
        }, (err, data) => {
            if(err){
                return rej(err);
            }
            return res(data)
        })
    });
}

module.exports = {
    getObject: getObject,
    putObject: putObject
}