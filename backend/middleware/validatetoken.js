import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        console.log(`Token Received: ${token}`);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.error("Token verification failed:", err);
                return res.status(401).json({ message: "User not authorized" });
            }

            console.log("Decoded Token:", decoded);
            req.user = decoded; 
            console.log("req.user after attaching decoded data:", req.user);
            next(); 
        });
    } else {
        console.log("Authorization token missing");
        return res.status(401).json({ message: "Authorization token is missing" });
    }
});

export default validateToken;
