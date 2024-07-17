import mongoose from "mongoose";

 export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://vinay89:Vinay89@cluster0.k9uteue.mongodb.net/blogs")
      console.log("DB connected successfully");
}