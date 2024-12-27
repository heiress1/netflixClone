import jwt from "jsonwebtoken"; //an instance of jsonwebtoken library is made 
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userid,res) => {
    //jwt.sign is how we create a token
    //the userid is the tokens payload that is encoded into it so we can itdentify the user
    //the env_vars.jwt_secret is the secret key used to sign the token so the token can be verified by server
    const token = jwt.sign({ userid }, ENV_VARS.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwtNetflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true, //the cookie is only avaible via browser and not javascript to prevent XSS attacks
        sameSite: "strict", //the cookie is not sent with cross-origin requests, prevents CSRF attacks
        //only in https will it be true, when we deploy this application
        //in localhose its http
        secure: ENV_VARS.NODE_ENV !== "development",
    })

    return token; 
    /*
    so baicually the cookie will save a copy of the original token in the browser so that subsequent http requests from the client can be validated againts the originaed token saved in the cookie to validate it is still the same user and nothing has been tampered with
    */

   
}