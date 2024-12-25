import express from "express";

import { signup, login, logout } from "../controllers/auth.controller.js";

//create a new router object using the router method from express module
const router = express.Router();



//builds routes
//version number is used incase we use a different version of the API
router.get("/signup", signup);


router.get("/login", login);

router.get("/logout", logout);

export default router;
