const { promisify } = require('util');

module.exports = {
    init: async function ($region, $accessKey, $secretAccessKey) {

        try {
            if (!$accessKey || !$secretAccessKey) throw ('Access Key or Secret Access Key not informed');
            if (!$region) throw ('Region not informed');

            var AWS = require('aws-sdk');
            this.$auth = { accessKey: $accessKey, secretAccessKey: $secretAccessKey }
            var s3 = new AWS.S3({ region: $region, credentials: { accessKeyId: this.$auth.accessKey, secretAccessKey: this.$auth.secretAccessKey }, apiVersion: '2006-03-01' })
            this.$s3 = s3;

        } catch (error) {
            return Promise.reject('Fail on init: ' + error)
        }
    },

    /**
     * @description Create a new bucket using "createBucket" sdk method
     * @link https://docs.aws.amazon.com/pt_br/AWSJavaScriptSDK/latest/AWS/S3.html#createBucket-property
     * @param {String} $bucketName The name for new bucket
     * @param {String} $region The aws location server for the bucket
     * @returns Object with the location url from bucket
     */
    createBucket: async function ($bucketName, $region) {

        try {
            this.$s3.createBucket({
                Bucket: $bucketName, CreateBucketConfiguration: {
                    LocationConstraint: $region
                }
            }, function (err, data) {
                if (err) throw ('Fail in create a new bucket: ')
                return Promise.resolve(data)
            })
        } catch (error) {
            return Promise.reject('Fail on create a new bucket: ' + error)

        }

    },

    uploadObject: async function($bucketName, $filePath, $content, $fileType){

        try {
            var params = {
                ACL:'public-read',
                Bucket: $bucketName,
                Key: $filePath,
                Body:$content
            }
    
            if($fileType && typeof $fileType == 'string') params.ContentType = $fileType
    
            var data = await this.$s3.upload(params, {}).promise();
            return Promise.resolve(data)
            
        } catch (error) {
            return Promise.reject('Fail on upload object: ' + error)
        }
    }
    
}