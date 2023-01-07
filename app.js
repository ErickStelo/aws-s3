// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Set the region 
AWS.config.update({region: 'sa-east-1', credentials: {accessKeyId: 'AKIAVO6RIPJ3MVZ74QJC', secretAccessKey: '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'}});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});


// Call S3 to list the buckets
// s3.listBuckets(function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Buckets);
//   }
// });

(async function () {

    var newFileName = 'file' + new Date().getMilliseconds() + '.txt'
    var filePath = path.join(__dirname, 'arquivos', newFileName)
    var writeFile = promisify(fs.writeFile)
    var unlink = promisify(fs.unlink)
    var readDir = promisify(fs.readdir)

    var files = await readDir(path.join(__dirname, 'arquivos'))

    files.forEach(file => {
        unlink(path.join(__dirname, 'arquivos', file))
    })

    await writeFile(filePath, 'aaaaaaaaaaa');

    var fileContent = fs.readFileSync(filePath);

    var params = {
        Bucket: 'buckettesteintegracao',
        Key: newFileName,
        Body: fileContent,
        Acl: 'public-read'
    }

    const data = await s3.upload(params).promise();
    console.log(data.Location);
    return data.Location;
})();






// await aaa
// async function uploadFile(fileName, filePath){
    

// }

// uploadFile(newFileName, path.join(__dirname, newFileName))