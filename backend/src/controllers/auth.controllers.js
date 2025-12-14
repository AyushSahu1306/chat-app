import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/utils.js";

export const signup = async (req,res) => {
    
    const {fullName , email, password} = req.body;

    try {
        if(!fullName || !email || !password){
            return res.status(400).json({
                message:"All fields are required"
            });
        }

        if(password.length < 6){
            return res.status(400).json({
                message:"Password must be atleast 6 characters long"
            });
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                message:"User already exists with this email"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        });

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                message:"User created successfully",
                data:newUser
            });
        }

        else {
            res.status(400).json({
                message:"Something went wrong"
            });
        }


    } catch (error) {
        console.log("Error in signup",error.message);
        res.status(500).json({message:"Internal Server error"});
    }
}

export const login = async (req,res) => {}

export const logout = async (req,res) => {}


export const updateProfile = async (req,res) => {}