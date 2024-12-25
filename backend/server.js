// const express = require('express'); commonJS way to import express
//alternative way to import express 
import express from "express"; //ES6 way to import express

import dotenv from "dotenv";

//when importing from a local file, you need the .js extension because we are using the type in the package.json is module  

import authRoutes from "./routes/auth.route.js"; //import the authRoutes from the auth.route file
dotenv.config();
const app = express();

console.log("MONGO_URI", process.env.MONGO_URI);
//version number is used incase we use a different version of the API
app.use("/api/v1/auth", authRoutes); //use the authRoutes for the /api/v1/auth URL

//listen to the root URL, consoles a message
app.listen(5000, () => {
  console.log("Server is listening at http://localhost:5000");
});