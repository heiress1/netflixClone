// const express = require('express'); commonJS way to import express
//alternative way to import express 
import express from "express"; //ES6 way to import express
import cookieParser from 'cookie-parser';

//when importing from a local file, you need the .js extension because we are using the type in the package.json is module  
import authRoutes from "./routes/auth.route.js"; //import the authRoutes from the auth.route file
import movieRoutes from "./routes/movie.route.js"; //import the authRoutes from the auth.route file
import tvRoutes from "./routes/tv.route.js"; //import the authRoutes from the auth.route file
import { protectRoute } from "./middleware/protectRoute.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js"; //import the connectDB function from the db file
const app = express();

//use is a express method that allows us to use middleware functions to access the request object (req), the response object (res), and the next function in the application’s request-response cycle
app.use(express.json()); //express.json() method allows us to parse JSON payloads in incoming HTTP requests and use req.body

app.use(cookieParser()); //cookieParser() method allows us to parse cookies in incoming HTTP requests and use req.cookies
const PORT = ENV_VARS.PORT; //assign the port number to the PORT variable

//version number is used incase we use a different version of the API
//the url routes are used to access different parts of web application
//express then allows you to use these routes for different http requests in the respective route files
//this mounts the authroutes router to the /api/v1/auth path
//meadning all requests to /api/v1/auth will be handled by the authRoutes router
app.use("/api/v1/auth", authRoutes); //use the authRoutes for the /api/v1/auth URL

//protectRoute is a middleware function that checks if the user is logged in
//if the user is logged in, they will be allowed to access the movie and tv routes
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);

app.use("/api/v1/search", protectRoute, searchRoutes);


//listen to the root URL, consoles a message
app.listen(PORT, () => {
  console.log("Server is listening at http://localhost:"+PORT);
  connectDB(); 
});



