//model is used to understand the schema of the user data
import mongoose from "mongoose"; //import mongoose package

//create a new schema for the user
const userSchema = new mongoose.Schema({ 
    username: {
        type:String,
        required: true,
        unique: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type:String,
        required: true,
    },
    image: {
        type:String,
        default: ""
    },
    searchHistory:{
        type:Array,
        default: []

    }
});

//create a model for the user schema
//a model reps the data structure and the associated behaviours
//a model defines the schema for the data collection and provides an interface to interact with data
//create a 'user' model using the userSchema
//quotation marks need to be single quotes and first letter needs to be uppercase
//mongo will convert 'User' to lowercase and pluralize it to 'users'
export const User = mongoose.model('User', userSchema); 

