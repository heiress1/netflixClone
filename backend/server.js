// const express = require('express'); commonJS way to import express
//alternative way to import express 
import express from "express"; //ES6 way to import express

const app = express();

//builds a signout route
// controller functon that takes in a request and response
//version number is used incase we use a different version of the API
app.get("/api/v1/signup", (req, res) => {
    res.send("signup route");
});


app.get("/api/v1/login", (req, res) => {
    res.send("login route");
});

app.get("/api/v1/logout", (req, res) => {
    res.send("logout route");
});

//listen to the root URL, consoles a message
app.listen(5000, () => {
  console.log("Server is listening at http://localhost:5000");
});