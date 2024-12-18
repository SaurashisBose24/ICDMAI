import {app} from './app.js';
import express from "express";
import connectDB from './db/connection.js';

connectDB()
.then(()=>{
    app.listen(4000, () => {
        console.log(`Server running at port ${4000}`);
    })
})
.catch((err)=>{
    console.log("Error connecting MongoDb");
})

