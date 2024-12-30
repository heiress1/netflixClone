
import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

/**
 * Searches for a person on TMDB and updates the user's search history.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.query - The search query.
 * @param {Object} req.user - The authenticated user object.
 * @param {Object} res - The data object.
 * 
 * @returns {Promise<void>} - A promise that resolves when the search is complete.
 * 
 * @throws {Error} - Throws an error if the search fails or if there is an issue updating the user's search history.
 */
export async function searchPerson(req,res){
    const {query} = req.params;
    try{
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        // Log the response to check its structure
        console.log("TMDB API Response:", response);
        if (response.results.length === 0 ){
            return res.status(404).send(null);
        }

        //once you successfully search for somthing, add it to the serach history
        //we are able to access the user through the req because we added it in protectRoute
        //where we validated the user was logged in then added the user object to the req object
        //updates user search history in mongodb using mongoose using the User that we imported from the user.model file
        //which is a user schema that you you to interact with the user collection in the database
        //in this case, the serach history
        //findbyidandupdate is a mongoose method to find documents by id and update
        //takes two arugments, the user id, to be updated object with the specified changes
        await User.findByIdAndUpdate(req.user._id, {
            //$push adds a new entry to the search history array in the schema
            $push: {
                //adds new search history object to array
                searchHistory: {
                    id: response.result[0].id,
                    image: response.result[0].profile_path,
                    title: response.result[0].name,
                    searchType: "person",
                    createdAt: new Date(),
                },
            },
        });
        
        //return data.result because when we fetch the data from the API, the data is stored in the result key
        //we can check this on the tmdb website and check the response after fetching 
        res.status(200).json({success:true, content:response.results});
        
    }catch(error) {
        console.error("Error in searchPerson:", error.message);

        res.status(500).json({success:false, message:"Internal Server Error"});
    }

}

/**
 * Searches for a movie based on the query parameter and updates the user's search history.
 * 
 * This function is called by the Express.js router when a GET request is made to the search movie endpoint.
 * It fetches movie data from The Movie Database (TMDB) API based on the query parameter, and if a movie is found,
 * it updates the user's search history with the movie details.
 * 
 * @param {Object} req - The request object from the Express.js router.
 * @param {Object} req.params - The parameters from the request URL.
 * @param {string} req.params.query - The search query for the movie.
 * @param {Object} req.user - The authenticated user object.
 * @param {Object} res - The response object from the Express.js router.
 * 
 * @returns {Promise<void>} - Sends a JSON response with the search results or an error message.
 * 
 * @throws {Error} - Throws an error if the search fails or if there is an issue updating the user's search history.
 */
export async function searchMovie(req,res){

    const {query} = req.params;

    try{
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0 ){
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.result[0].id,
                    image: response.result[0].poster_path,
                    title: response.result[0].title,
                    searchType: "movie",
                    createdAt: new Date(),
                },
            },
        });
        
        res.status(200).json({success:true, content:response.results});
    }catch(error) {
        console.error("Error in searchMovie:", error.message);

        res.status(500).json({success:false, message:"Internal Server Error"});
    }   
}

/**
 * Searches for a movie based on the query parameter and updates the user's search history.
 * 
 * This function is called by the Express.js router when a GET request is made to the search movie endpoint.
 * It fetches movie data from The Movie Database (TMDB) API based on the query parameter, and if a movie is found,
 * it updates the user's search history with the movie details.
 * 
 * @param {Object} req - The request object from the Express.js router.
 * @param {Object} req.params - The parameters from the request URL.
 * @param {string} req.params.query - The search query for the movie.
 * @param {Object} req.user - The authenticated user object.
 * @param {Object} res - The response object from the Express.js router.
 * 
 * @returns {Promise<void>} - Sends a JSON response with the search results or an error message.
 * 
 * @throws {Error} - Throws an error if the search fails or if there is an issue updating the user's search history.
 */
export async function searchTV(req,res){
    const {query} = req.params;
    try{
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0 ){
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.result[0].id,
                    image: response.result[0].poster_path,
                    title: response.result[0].name,
                    searchType: "tv",
                    createdAt: new Date(),
                },
            },
        });
        
        res.status(200).json({success:true, content:response.results});
    } catch(error){
        console.error("Error in searchTv:", error.message);

        res.status(500).json({success:false, message:"Internal Server Error"});
    }


}

/**
 * Retrieves the search history of the authenticated user.
 * 
 * This function is called by the Express.js router when a GET request is made to the search history endpoint.
 * It fetches the search history from the authenticated user's data and sends it as a JSON response.
 * 
 * @param {Object} req - The request object from the Express.js router.
 * @param {Object} req.user - The authenticated user object, which contains the user's data.
 * @param {Object} res - The response object from the Express.js router.
 * 
 * @returns {Promise<void>} - Sends a JSON response with the user's search history or an error message.
 * 
 * @throws {Error} - Throws an error if there is an issue retrieving the search history.
 */
export async function getSearchHistory(req,res){
    try{
        //user is a instance of the User model, so we can access the searchistory property in the schema
        res.status(200).json({success:true, content:req.user.searchHistory});
        
    }catch(error){
        console.error("Error in getSearchHistory:", error.message);

        res.status(500).json({success:false, message:"Internal Server Error"});
    }
}

export async function deleteItemFromSearchHistory(req,res){

}

