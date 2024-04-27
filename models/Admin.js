
import mongoose from "mongoose";
 const adminSchema = new mongoose.Schema({
    username: { type: String, required:true, unique:true},
    password: { type: String, required:true}
 })

 const adminModel  = mongoose.model("admin", adminSchema);
 export {adminModel as admin} 