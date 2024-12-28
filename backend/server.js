// const express = require('express'); commonJS way to import express
//alternative way to import express 
import express from "express"; //ES6 way to import express

//when importing from a local file, you need the .js extension because we are using the type in the package.json is module  
import authRoutes from "./routes/auth.route.js"; //import the authRoutes from the auth.route file
import movieRoutes from "./routes/movie.route.js"; //import the authRoutes from the auth.route file

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js"; //import the connectDB function from the db file

const app = express();

//use is a express method that allows us to use middleware functions to access the request object (req), the response object (res), and the next function in the application’s request-response cycle
app.use(express.json()); //express.json() method allows us to parse JSON payloads in incoming HTTP requests and use req.body

const PORT = ENV_VARS.PORT; //assign the port number to the PORT variable

//version number is used incase we use a different version of the API
app.use("/api/v1/auth", authRoutes); //use the authRoutes for the /api/v1/auth URL
app.use("/api/v1/movie", movieRoutes);

//listen to the root URL, consoles a message
app.listen(PORT, () => {
  console.log("Server is listening at http://localhost:"+PORT);
  connectDB(); 
});



