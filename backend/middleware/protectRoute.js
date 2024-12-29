//makes sure that the use is logged in first before they are 
//allowed to access the movie and tv routes
//aka search up movies and tvshows

//take cookies and validate it
import jwt from "jsonwebtoken"; 
import { ENV_VARS } from "../config/envVars.js"; 
import {User} from "../models/user.model.js"; 
//once validated, you can do the next part, that is, to allow access to movie and tv routes

export const protectRoute = async (req, res, next) => {
    try {
        //retrives cookie from client request in express.js app
        //this is so we can validate the user is logged in
        //in req contains information about a http request
        //the .cookies property has middleware that parses cookies in the request
        //after parsing, it converts the data into a javascript object of key value pairs
        //jwtNetflic is the key that gives you the value of the cookie that is assinged to token
        
        const token = req.cookies["jwtNetflix"];

        //if there is no token, the user is not logged in
        if (!token) {
            return res.status(401).json({success:false, message:"Unauthorized, no token provided"});
        } 

        //decodes the token using the secret key
        //if valid, the info in the token is returned
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET); //decodes the token using the secret key
        if (!decoded) {
            return res.status(401).json({success:false, message:"Unauthorized, invalid token"});
        }  

        //finds the user by the id in the token
        //minus the password
        const user =  await User.findById(decoded.userid).select("-password"); 

        if (!user){
            return res.status(404).json({success:false, message:"Unauthorized, user not found"});
        }

        req.user  = user; //adds the user object to the request object

        next(); //if the user is logged in, the next middleware function is called
        
    }catch(error){
        console.error("Error in protectRoute:", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }

}
