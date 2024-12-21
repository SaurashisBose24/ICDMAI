import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const c = await mongoose.connect("mongodb+srv://saurashisbosex1scpvm:NAH5EQy4nancnrTf@cluster0.yey8e.mongodb.net/ICDMAI");
        console.log("MongoDb connected");
    }
    catch(err){
        console.log("Error in connecting the database");
        process.exit(1);
    }
}

export default connectDB;