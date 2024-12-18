import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const c = await mongoose.connect("mongodb://localhost:27017/ICDMAI");
        console.log("MongoDb connected");
    }
    catch(err){
        console.log("Error in connecting the database");
        process.exit(1);
    }
}

export default connectDB;