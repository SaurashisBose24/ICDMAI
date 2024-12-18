import {asynchandler} from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { JobDes } from "../models/jobdes.models.js";
import { User } from "../models/user.models.js";


const setcurrentRole = asynchandler(async(req,res)=>{
    const role = req.body.current;
    const job = await JobDes.findOne({owner: req.user._id});
    if(job){
        throw new ApiError(402,"Already current role is chosen");
    }
    const user = await User.findById(req.user._id);
    const jobdesc = await JobDes.create({
        current: role,
        owner: user.id
    })
    return res.status(201).json(
        new ApiResponse(201,jobdesc,"Current role added successfully")
    );
})


const updatecurrentRole = asynchandler(async(req,res)=> {
    const curr = req.body.current;
    const job = await JobDes.findOne({owner: req.user._id});
    if(job){
        job.current=curr;
        const updated = await job.save();
        return res.status(201).json(
            new ApiResponse(201,updated,"Current role updated successfully")
        );
    }
    else{
        throw new ApiError(402,"User have not yet chosen any previous current role");
    }
})

const setinterestedRole = asynchandler(async(req,res)=>{
    const role = req.body.interested;
    const user = await User.findById(req.user._id);
    const job = await JobDes.findOne({owner: user._id});
    if(!job){
        throw new ApiError(402,"Please choose current role");
    }
    job.interested.push(role);
    const updated = await job.save();
    return res.status(201).json(
        new ApiResponse(201,updated,"Interested role added successfully")
    );
})

const removeinterestedRole = asynchandler(async(req,res)=>{
    const role = req.body.interested;
    const user = await User.findById(req.user._id);
    const job = await JobDes.findOne({owner: user._id});
    if(!job){
        throw new ApiError(402,"No interested role is chosen");
    }
    const index = job.interested.indexOf(role);
    if(role==-1){
        throw new ApiError(402,"Role is not chosen as interested role");
    }
    job.interested.splice(index,1);
    const updated = await job.save();
    return res.status(201).json(
        new ApiResponse(201,updated,"Interested role removed successfully")
    );
})

export {setcurrentRole,updatecurrentRole,setinterestedRole,removeinterestedRole};