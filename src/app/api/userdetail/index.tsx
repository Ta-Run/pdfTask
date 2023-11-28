import User from "../../../../models/user";
import dbConnect from "../../../../config/dbconnect";

dbConnect();

export default async (req:any , res:any)=>{
    const {method} = req;
     switch(method){
        case 'GET':
            try{
        const userdata = await User.find({});
        console.log(userdata);
           res.status(200).json({success: true ,result:userdata});
            }catch(err){
                res.status(400).json({success:false});
            }
    }
}