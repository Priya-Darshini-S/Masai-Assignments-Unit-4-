require("dotenv").config()
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, `${process.env.JWT_ACCESS_KEY}`, function(err, token){
         if(err) return reject(err);
         return resolve(token);
        });
    });
};

module.exports = async (req, res, next) => {
    //if we received the bearer token
    const bearerToken = req?.headers?.authorization;


    //if not received or token is not bearer throw error
     if(!bearerToken || !bearerToken.startsWith("Bearer "))
     return res.status(400).json({
         status: "failed",
         message: "Please provide a valid token",
     });



    //else try to get user from token
      const token = bearerToken.split(" ")[1];
     
     let user;
     try{
        user = await verifyToken(token);
     }catch(e){
        return res.status(400).json({
            status: "failed",
            message: "Please provide a valid token",
        });
     }
     

    //if no user found then will throw an error
     if(!user) 
     return res.status(400).json({
        status: "failed",
        message: "Please provide a valid token",
    });

    //else we will attach user to req

    req.user = user;

    //return next
    return next();
};