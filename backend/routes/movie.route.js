import express from "express";

import { getTrendingMovie } from "../controllers/movie.controller.js";
import { getMovieTrailers } from "../controllers/movie.controller.js";
import { getMovieDetails } from "../controllers/movie.controller.js";
import { getSimilarMovies } from "../controllers/movie.controller.js";
import { getMoviesByCategory } from "../controllers/movie.controller.js";


//routers are paths to different pages of the website
//the route will specify how it will respond to a http request
const router = express.Router();

//the website homescreen will show one trending movie as the hero image
//everything the getTredningmovie function is called, it will return a random movie from the trending moveies list in the tmdb api

router.get("/trending", getTrendingMovie);
//:id is a route parameter that is used to identify a specific trailer
//the :id can be any id value
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);


export default router;
