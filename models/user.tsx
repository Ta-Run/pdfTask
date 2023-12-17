import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    pdfFile:{
      type:Buffer,
      required:true
    },


})

// const  User = mongoose.model('User',userSchema);
export default  mongoose.models.User || mongoose.model("User", userSchema);