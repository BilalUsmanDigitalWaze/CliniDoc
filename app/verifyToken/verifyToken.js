const jwt = require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config();

const verifyToken=async (token)=>{
    if (!token){
      return {status:404,message:"no token"};
    }

   return await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
      if (err){ 
        console.log(err)
        const error= {status:404,message:err}
        return error;
      }else{
        const decode={status:200,message:decoded}
        return decode;
      }
    });
}
module.exports=verifyToken