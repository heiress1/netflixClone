//axios is a http client library to simplify the process of making http requests to apis
import axios from 'axios';

import { ENV_VARS } from '../config/envVars.js';

//the function will fetch data from the tmdb api where it will be called with the url it wants to fetch data from
//this way whenever we want to fetch data from the tmdb api we can call this function with the url we want to fetch data from
//the function will return the data fetched from the tmdb api
export const fetchFromTMDB = async (url) => {

    //this is an object that configures the get http request for axios
    //the headers are needed for the request to be accepted by tmdb api
    const options = {
        
        headers: {
          // the type of response the client expects from server
          accept: 'application/json',
          //ensures the client is authorized to access the api by checking the json matches the key saved in the .env file
          Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
        }
    };

    //makes an http get request to the tmdb api and options object  
    const response = await axios.get(url, options)

    if (response.status !== 200){
        throw new Error("Failed to fetch data from TMDB");
    }

  
    return response.data;
};