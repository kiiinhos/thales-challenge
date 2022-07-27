const AWS = require('aws-sdk');
const S3 = new AWS.S3();


async function notExistObject({Bucket,Key}){
    try {
      await S3.getObject({Bucket,Key}).promise();
      console.log("passou aqui")
      return false
  } catch (err) {
      console.log("Error", err);
        return true
  }
}

function fileRename(filename){
  return filename.indexOf(".json") == -1 ? (filename +".json") : filename;
}
function configBucket(filename){
    return {
        Bucket: "thales-challenge",
        Key: filename,
    };
}
exports.handler = async (event) => {
  const {filename} = event.pathParameters
  let filenameConcat = fileRename(filename)
  const bucketParams = configBucket(filenameConcat)
  
    let response = {
    statusCode: 500,
  }
   try {
    if(await notExistObject(bucketParams)){
      console.log("Failed. Object not found")
      response.statusCode = 404
      return response
    }
    const data = await S3.deleteObject(bucketParams).promise();
    console.log("Success. Object deleted.", data);
    response.statusCode = 204
  } catch (err) {
    console.log("Error", err);
  }

  return response
}