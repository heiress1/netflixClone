//express is a node.js framework that simples the process of creating server-side applications and APIs by providing functionalities and middleware
import express from "express"; 
import { searchPerson, searchMovie, searchtv } from "../controllers/search.controller.js"; //import the searchPerson function from the search.controller file

const router = express.Router(); //create a new router object

//search routers
router.get("/person/:query", searchPerson); //create a new route that listens for GET requests to the /person/:query URL
router.get("/movie/:query", searchMovie); l
router.get("/tv/:query", searchtv); 

router.get("/history", getSearchHistory); //create a new route that listens for GET requests to the /history URL

router.delete("/history/:id", deleteItemFromSearchHistory); //create a new route that listens for DELETE requests to the /history/:id URL


export default router; //export the router object