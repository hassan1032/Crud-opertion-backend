
import mongoose from "mongoose";
 const adminSchema = new mongoose.Schema({
    username: { type: String, required:true, unique:true},
    password: { type: String, required:true},
   //  role: {
   //    type: String,
   //    enum: ['admin', 'user'], // Specify the allowed enum values
   //    default: 'admin' // Optional: Set a default value
   //  }
 })

 const adminModel  = mongoose.model("Admin", adminSchema);
 export {adminModel as Admin} 