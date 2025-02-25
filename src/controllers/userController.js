import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js"
import multer from "multer";
import fs from "fs"
import path from "path"
export const loginUser = asyncHandler(async (req, res) => {
  try{
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    req.user = user;
    res.json({
  
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  }
  catch(error){
    console.log(error);
  }
}); 


// @desc Register new user with image upload
// @route POST /api/users/register
// @access Public
export const registerUser = asyncHandler(async(req, res) => {
  const { name, email, password } = req.body;
  const profileImagepath = req.file ? req.file.path : null;

  // Handle user registration logic
  
const userExists = await User.findOne({ email });
const usernameExists = await User.findOne({ name });
if (userExists && usernameExists) {
  res.status(400);
  throw new Error("User already exists");
}

const user = await User.create({ name, email, password, image: profileImagepath });

if (user) {
  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image || "No image uploaded",
    },
  });
} else {
  res.status(400);
  throw new Error("Invalid user data");
}
});
