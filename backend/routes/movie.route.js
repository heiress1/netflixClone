import express from "express";
import { getTrendingMovie } from "../controllers/movie.controller.js";

//routers are paths to different pages of the website
//the route will specify how it will respond to a http request
const router = express.Router();

//the website homescreen will show one trending movie as the hero image
//everything the getTredningmovie function is called, it will return a random movie from the trending moveies list in the tmdb api

router.get("/trending", getTrendingMovie);


export default router;
