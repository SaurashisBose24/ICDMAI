import mongoose, { Schema, SchemaType } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password,5);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this.id,
    },"icdmai",
    {
        expiresIn: "1d",
    })
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this.id,
    },"icdmai",
    {
        expiresIn: "10d",
    })
}

export const User = mongoose.model("User",userSchema);