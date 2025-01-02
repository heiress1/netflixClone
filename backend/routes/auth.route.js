import express from "express";

//import the signup, login, and logout functions from the auth.controller file
import { signup, login, logout, authCheck } from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/protectRoute.js";
//create a new router object using the router method from express module
const router = express.Router();



//builds routes
//sends a post request to the signup endpoint and uses the signup function 
//when a client (broswer, postman) sends a post request (json data) to the signup function
//express router calls the matching function wher req and res are auto passed in by express.js
router.post("/signup", signup);


router.post("/login", login);

router.post("/logout", logout);

//since the protectRoute middleware is before the authCheck, protect routes runs first to authenticaes the users's status
//when the user goes to /authCheck in the borwser, protextRoute runs first to check if the user is logged in
//if the user is logged in, the authCheck function runs
router.get("/authCheck", protectRoute, authCheck);

export default router;
