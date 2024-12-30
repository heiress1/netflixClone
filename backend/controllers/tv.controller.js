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

export async function getTrendingTV(req, res) {

  try{
    const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({success:true, content:randomMovie});
  }catch (error){
    console.error("Error in getTrendingMovie:", error.message);

    res.status(500).json({success:false, message:"Internal Server Error"});
  }
}

export async function getTVTrailers(req,res){
  //{id } is destruturing assingment syntax that allows you to extract properties from objects and assign then to varialbes
  //id property of the the req.pararms
  //it extracts the id property and assigsn it to id variable
  const {id} = req.params;

  try {
    //this is a dynamic url, the ${id} brings the url to the endpoint of a trailer 
    //the id represents the movie trailer id
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
    res.json({success:true, trailers:data.results});
  }catch(error){
    if (error.message.includes("404")){
      return res.status(404).send(null)
    }

    console.error("Error in getMovieTrailers:", error.message);



    res.status(500).json({success:false, message:"Internal Server Error"});


  } 



}

export async function getTVDetails (req, res) {
  const {id} = req.params;  
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);  
    res.status(200).json({success:true, content:data});
  }catch(error){
    if (error.message.includes("404")){
      return res.status(404).send(null)
    }

    console.error("Error in getMovieDetails:", error.message);

    res.status(500).json({success:false, message:"Internal Server Error"});
  }

}


export async function getSimilarTVs(req, res) {
  const {id} = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
    res.status(200).json({success:true, content:data.results});
  }catch(error){


    console.error("Error in getSimilarDetails:", error.message);

    res.status(500).json({success:false, message:"Internal Server Error"});
  }
}


export async function getTVsByCategory (req, res) {
  const {category} = req.params;
  
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
    res.status(200).json({success:true, content:data.results});
  }catch(error){
    console.error("Error in getMoviesByCategory:", error.message);

    res.status(500).json({success:false, message:"Internal Server Error"});
  }
}
