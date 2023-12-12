import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    pdfFile:String
})

// const  User = mongoose.model('User',userSchema);
export default  mongoose.models.User || mongoose.model("User", userSchema);