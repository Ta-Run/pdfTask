import { NextResponse } from 'next/server';
import User from '../../../../models/user';
import dbConnect from '../../../../config/dbconnect';

export async function GET(request:any){
   await dbConnect();
   const getUser = await User.find({});
   return  NextResponse.json({result:getUser,success:true})
}

export async function POST(request:any){
   await dbConnect();
   const payload = await request.json();
   let user= new User(payload)
   const result = await user.save();
   return  NextResponse.json({result,success:true});
}