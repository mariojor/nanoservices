'use strict';

const dynamodbService = require("./service/dynamodbService");
const s3Service = require("./service/s3Service");

module.exports.upload = async (event) => {
  const item = await s3Service.upload(event.body)
  try{
    await dynamodbService.put(item);
    return {
      statusCode: 201,
      body: JSON.stringify(item), 
    };  
  }catch(e){
     return {
      statusCode: 500,
      body: JSON.stringify(e), 
    }; 
  }
  
};
