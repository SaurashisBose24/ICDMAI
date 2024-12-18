import {ApiError} from "../utils/ApiError.js";
import {asynchandler} from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.models.js";

const verifyUser = asynchandler( async(req,_,next)=>{
    try{
        const token = req.cookies?.accessToken;
        if(!token)
            throw new ApiError(403,"Unauthorised Access");
        const decoded_token = jwt.verify(token,"icdmai");
        const user = await User.findById(decoded_token._id).select("-password -refreshToken");
        if(!user)
            throw new ApiError(403,"Unauthorised Access");
        req.user = user;
        next();
    }catch(error){
        throw new ApiError(401,error.message);
    }
} )

export {verifyUser};