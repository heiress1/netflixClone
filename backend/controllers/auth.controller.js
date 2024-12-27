import {User} from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

// controller functons that takes in a request and response

export async function signup(req, res) {
    
    //user wants to send a couple of credentials to the server
    try {
        //req.body is an object in express that contains data sent by client in body of HTTP request
        //used in post, put, patch requests
        //in json format
        //to populate req.body, you need to use middleware express.json() in the server.js file
        const {email, password, username} = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({success: false, message: "Please provide all fields"});
        }

        //tests to see if email is valid 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({success: false, message: "Invalid email"});
        }

        if (password.length < 6) {
            return res.status(400).json({success: false, message: "Password must be at least 6 characters"});
        }

        //check for duplicate email
        const existingEmail = await User.findOne({email:email})

        if (existingEmail) {
            return res.status(400).json({success: false, message: "Email already exists"});
        }

        //check for duplicate username
        const existingUsername = await User.findOne({username:username})

        if (existingUsername) {
            return res.status(400).json({success: false, message: "Username already exists"});
        }

        //creates a salt to hash passwords
        const salt = await bcryptjs.genSalt(10);

        //hash the user password with the salt we created
        const hashedPassword = await bcryptjs.hash(password,salt);

        //default user profile pics
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

        //get image randomly
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];  


        const newUser = new User({
           email:email,
           //now when the user object is saved into mongodb, the password will be hashed 
           password:hashedPassword,
           username:username,
           image:image
        });

        
        generateTokenAndSetCookie(newUser._id, res);
        //saves a new user document to the mongodb database
        await newUser.save();

        //a user was created successfully so we return success and the user object
        res.status(201).json({success: true, user:{
        //_doc is a mongoose property that returns the document object that contains just the raw data 
        //as when mongoose document is created, it includes metadata and methods which we leave out with _doc
        ...newUser._doc, 
        password: ""
        }});

    
        //not 500 as we already checked for invalid user data
        //
        res.status(400).json({success: false, message: "Internal server error"});

    } catch (error) {
        console.error("error in signup controller: " + error.message);
        //res is an object from express that receives the HTTP request express sends
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export async function login(req, res) {
    res.send("login route");
}

export async function logout(req, res) {
    res.send("logout route");
}

