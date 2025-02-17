import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";


const getUser = asyncHandler(async (req, res, next)=>{
    let token;

    // Read the jwt from the cookie
    token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
})


export {getUser};
