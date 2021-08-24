const dotenv = require('dotenv').config()
const aws = require('aws-sdk')
const crypto = require('crypto')
const { promisify } = require("util")
const randomBytes = promisify(crypto.randomBytes)

//grabs information from the env file
const region = process.env.REGION
const bucketName = process.env.BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

// creates a new S3 instance
const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

//generates a url which expires in 60 seconds if not uploaded
async function generateUploadURL() {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')
  
    const params = ({
      Bucket: bucketName,
      Key: imageName,
      Expires: 60
    })
    
    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
  }

  module.exports = generateUploadURL