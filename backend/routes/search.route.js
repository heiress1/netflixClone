//express is a node.js framework that simples the process of creating server-side applications and APIs by providing functionalities and middleware
import express from "express"; 
import { searchPerson, searchMovie, searchTV, getSearchHistory, deleteItemFromSearchHistory } from "../controllers/search.controller.js"; //import the searchPerson function from the search.controller file
import { protectRoute } from "../middleware/protectRoute.js"; //import the protectRoute function from the protectRoute file

const router = express.Router(); //create a new router object

//search routers
router.get("/person/:query", protectRoute, searchPerson); //create a new route that listens for GET requests to the /person/:query URL
router.get("/movie/:query", protectRoute, searchMovie); 
router.get("/tv/:query", protectRoute,searchTV); 

router.get("/history", protectRoute,getSearchHistory); //create a new route that listens for GET requests to the /history URL

router.delete("/history/:id", protectRoute,deleteItemFromSearchHistory); //create a new route that listens for DELETE requests to the /history/:id URL


export default router; //export the router object