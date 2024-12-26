import express from "express";

import { signup, login, logout } from "../controllers/auth.controller.js";

//create a new router object using the router method from express module
const router = express.Router();



//builds routes
router.post("/signup", signup);


router.post("/login", login);

router.post("/logout", logout);

export default router;
