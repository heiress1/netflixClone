import mongoose from "mongoose"; //package to interact with the database
import { ENV_VARS } from "./envVars.js"; //import the ENV_VARS from the envVars file

//function to connect to the database
export const connectDB = async () => {
    try {
        //connect to the database using the mongoose.connect method
        //ENV_VARS.MONGO_URI is the connection string to the database
        //await is used to wait for the connection to be established before moving on
        //the established value which is the connection object is stored in conn
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI) 
        console.log("MongoDB connected:" + conn.connection.host);

    } catch (error) {
        console.error("MongoDB connection failed:" + error.message);
        process.exit(1); // 1 means error, 0 means success
    }
}
