import dotenv from "dotenv";
import mongoose from "mongoose";        
dotenv.config();

const connectDB = async () => 
{
   try
   {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
   }
   catch(error)
   {
    console.log(error);
    process.exit(1);
    
   }
}

export default connectDB;