const AWS = require('aws-sdk');
const S3 = new AWS.S3();


async function existObject({Bucket,Key}){
    try {
      await S3.getObject({Bucket,Key}).promise();
      console.log("passou aqui")
      return true
  } catch (err) {
      console.log("Error", err);
        return false
  }
}

function fileRename(filename){
  return filename.indexOf(".json") == -1 ? (filename +".json") : filename;
}

function configBucket(filename = null, body = {}){
    return {
        Bucket: "thales-challenge",
        Key: filename,
        Body: JSON.stringify(body),
        ContentType: 'application/json; charset=utf-8'
    };
}

exports.handler = async (event) => {
  if(!event){
    console.log('Payload obrigátorio')
    return{statusCode:400,message: 'Payload obrigátorio'}
  }
  const {filename} = event
  if(!filename){
    console.log('Atributo filename obrigátorio')
    return{statusCode:400,message: 'Atributo filename obrigátorio'}
  }
  if(typeof(filename) !== "string" ){
    console.log('Atributo filename deve ser uma string')
    return{statusCode:400, message: 'Atributo filename deve ser uma string'}
  }
  
  const fileRenamed = fileRename(filename)
  const configBucketS3 = configBucket(fileRenamed,event)
  
  if(await existObject(configBucketS3)){
    return {statusCode: 409,message:" Ja existe arquivo com esse nome"}
  }
  try {
    await S3.putObject(configBucketS3).promise();
    console.log("Upload Completed");
   
  let response = {
    filename: fileRenamed,
    statusCode:201
};
  return response
  
  } catch(e){
    console.log(e)
    console.log("Upload Error", e);
    
    return {statusCode:500, message:"Erro no servidor"}
    
  }
};
