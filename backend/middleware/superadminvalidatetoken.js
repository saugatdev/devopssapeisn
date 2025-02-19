import asyncHanlder from "express-async-handler"
import jwt from "jsonwebtoken"

const superadmintoken = asyncHanlder(async(req,res,next)=>{

    let token;
    const authHeader = req.headers.authorization || req.header.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        console.log(`token receiced ${token}`);
        

        jwt.verify(token,process.env.SUPERADMIN_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                console.log(`Token verification failed`,err);
                return res.status(401).json({message:"User not authorised"})
            }
        
        
            console.log("Decoded Token", decoded)
            req.superadmin = decoded;
            console.log(`req.user after attaching decoded data`,req.superadmin);
            next()
            
        });
    }
    else{
        console.log("Authorization token Missing");
        return res.status(401).json({ message: "Authorization token is missing" });

    }
})

export default superadmintoken