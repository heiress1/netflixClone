import dotenv from 'dotenv';

//dotenv is a module that loads environment variables form a .env file into the process.env object
//when config is called, it reads the .env file and assigns the values to the process.env object
dotenv.config(); 

export const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
}

console.log("MONGO_URI", process.env.MONGO_URI);

dotenv.config();

