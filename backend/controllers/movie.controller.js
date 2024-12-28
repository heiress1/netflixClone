import {fetchFromTMDB} from "../services/tmdb.service.js";


// this function is called by the express.js router when a post rquest is made to the endpoint
/**
 * Fetches a trending movie from an external API and sends a random movie from the results as a JSON response.
 * 
 * This function is called by the Express.js router when a POST request is made to the endpoint.
 * 
 * @param {Object} req - The request object from the Express.js router.
 * @param {Object} res - The response object from the Express.js router.
 * 
 * @returns {Promise<void>} - Sends a JSON response with a random trending movie or an error message.
 */

export async function getTrendingMovie(req, res) {

  try{
    const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({success:true, content:randomMovie});
  }catch (error){
    console.error("Error in getTrendingMovie:", error.message);

    res.status(500).json({success:false, message:"Internal Server Error"});
  }
}

export async function getMovieTrailers(req,res){
  //{id } is destruturing assingment syntax that allows you to extract properties from objects and assign then to varialbes
  //id property of the the req.pararms
  //it extracts the id property and assigsn it to id variable
  const {id} = req.params;

  try {
    //this is a dynamic url, the ${id} brings the url to the endpoint of a trailer 
    //the id represents the movie trailer id
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
    res.json({success:true, trailers:data.results});
  }catch(error){
    if (error.message.includes("404")){
      return res.status(404).send(null)
    }

    console.error("Error in getMovieTrailers:", error.message);



    res.status(500).json({success:false, message:"Internal Server Error"});


  } 



}