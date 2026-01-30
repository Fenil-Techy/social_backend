import mongoose from "mongoose";

const connectDB= async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/fenstack")
        console.log("Database connected");
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB;