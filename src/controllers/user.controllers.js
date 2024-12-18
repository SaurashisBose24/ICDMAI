import {asynchandler} from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {User} from "../models/user.models.js";

const generateAccessAndRefreshToken = async(userId) => {
    const user = await User.findById(userId)
    if(!user)
        throw new ApiError(401,"User not found");
    const accesstoken = await user.generateAccessToken()
    const refreshtoken = await user.generateRefreshToken()

    user.refreshToken = refreshtoken
    let c = await user.save({ validateBeforeSave: false })
    return {accesstoken, refreshtoken}
}

const register = asynchandler(async (req,res) => {
    const {username, email, password} = req.body;
    if([username, email, password].some((field)=> field?.trim() === ""))
        throw new ApiError(400,"All fields are required");
    const existUser = await User.findOne({email});
    if(existUser)
        throw new ApiError(402,"User already exists");
    const user = await User.create({
        username,
        email,
        password
    });
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser)
        throw new ApiError(401,"Something went wrong");
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    );
})

const login = asynchandler(async(req,res) => {
    const {email, password} = req.body;
    if(!email)
        throw new ApiError(400,"email is required");
    const user = await User.findOne({email:email});
    if(user.isPasswordCorrect(password)==false)
        throw new ApiError(401,"wrong credentials");
    const {accesstoken, refreshtoken} = await generateAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200)
    .cookie("accessToken",accesstoken,options)
    .cookie("refreshToken",refreshtoken,options)
    .json(
        new ApiResponse(200, loggedInUser, "logged in successfully")
    );
})

const logout = asynchandler(async(req,res) => {
    await User.findById(req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponse(200,{},"logged out"))
    )
})

export {register,login,logout};



