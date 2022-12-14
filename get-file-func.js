const AWS = require('aws-sdk');
const S3 = new AWS.S3();

exports.handler = async (event) => {
  const {filename} = event.pathParameters
  let filenameConcat = filename.indexOf(".json") == -1 ? (filename +".json") : filename;
  const bucketParams = { Bucket: "thales-challenge",Key:filenameConcat};
      let response = {
    statusCode: 500,
  }
  try {
      const {Body} = await S3.getObject(bucketParams).promise();
      response.statusCode = 200
      response.body = Body.toString('utf-8')
  } catch (err) {
      console.log("Error", err);
      if(err.statusCode){
          if(err.statusCode == 404){
              response.statusCode = err.statusCode
          }
      }
  }
  return response
}