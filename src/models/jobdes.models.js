import mongoose, { Schema, SchemaType } from "mongoose";
import { User } from "./user.models.js";

const jobdesSchema = new Schema({
    current: {
        type: String,
        required: true
    },
    interested: [
        {            
            type: String,
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: User
    }
})

export const JobDes = mongoose.model("JobDes",jobdesSchema);