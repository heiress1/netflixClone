//express is a node.js framework that simples the process of creating server-side applications and APIs by providing functionalities and middleware
import express from "express"; 
import { searchPerson, searchMovie, searchtv } from "../controllers/search.controller.js"; //import the searchPerson function from the search.controller file

const router = express.Router(); //create a new router object

router.get("/person/:query", searchPerson); //create a new route that listens for GET requests to the /person/:query URL
router.get("/movie/:query", searchMovie); l
router.get("/tv/:query", searchtv); 
