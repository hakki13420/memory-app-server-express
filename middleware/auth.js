const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const auth = (req, res, next) => {
   let decoded;
   let token;
   
   if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];      
   }
      
    if (token && token.length > 500) {
       decoded = jwt.decode(token, process.env.JWT_KEY)        
       req.user_id=decoded.sub 
    } else if(token && token.length <= 500) {
       decode = jwt.verify(token, process.env.JWT_KEY) 
       req.user_id=decoded.id        
    }
    next()
}

module.exports=auth