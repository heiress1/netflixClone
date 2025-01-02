//zustand is a state managment library for React
//provides a simple api for managing global state without a complex setup
//create is a function used to create a store
//a store is an object that holds state and provides methods to update state
//this is the core of zustands state managment that allows you to define initial state and modify state
import {create} from "zustand";

//shows beautfil notifications to the user
import toast from "react-hot-toast";

import axios from "axios";

//create function defines initial state an methods for store
//set is provided by zustand to update the state
export const useAuthStore = create ((set) => ({
    //initial state of the store
    //methods to update the state
    user: null,
    //are we in the process of signing up? 

    isSigningUp:false, //this is for the loading state of singing up
    signup: async(credentials)=> {
        //we are now signing in
        set({isSigningUp:true});
        try{
            //axios is used for sending http requests to the backend
            //sends a post request to the singup endpoint with the credentials as the request body
            //the response is the user object returned from the backend that contains information  about success, userdata or auth token
            //frontend makes http request to backend signup endpoint with user info
            //when a request is made to api/v1/auth/signup, express server matches the path to the authRoutes router 
            // then it matches the /signup part to the respective function than handles the http request
            //the http request is processed by the signup function in the auth.controller.js file
            // the signup function in the auth.controller is called
            const response = await axios.post("/api/v1/auth/signup", credentials);
            

            //now that we've singed up, we can set the user state
            set({user: response.data.user, isSigningUp:false});
            toast.success("Account created successfully");
        }catch(error){
            console.log("error in signup:", error.message);
            toast.error(error.response.data.message || "An error occured");
            console.log(error.response.data.message);
            set({isSigningUp:false, user:null});//user null because failed to sing up

        }
    },
    login:async()=> {},
    logout:async()=> {},
    authCheck:async()=> {},
    
}))