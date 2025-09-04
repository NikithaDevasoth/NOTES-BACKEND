import mongoose from "mongoose";
export const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);       
        console.log("DB Connected Successfully!");
        
    }
    catch(error){
        console.error("Error in connecting DB",error)
    process.exit(1);
    }
}