import express from "express";

//import the signup, login, and logout functions from the auth.controller file
import { signup, login, logout } from "../controllers/auth.controller.js";

//create a new router object using the router method from express module
const router = express.Router();



//builds routes
//sends a post request to the signup endpoint and uses the signup function 
//when a client (broswer, postman) sends a post request (json data) to the signup function
//express router calls the matching function wher req and res are auto passed in by express.js
router.post("/signup", signup);


router.post("/login", login);

router.post("/logout", logout);

export default router;
