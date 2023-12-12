import multer from 'multer';
import dbConnect from '../../../../config/dbconnect';
import { NextResponse } from 'next/server';
import User from '../../../../models/user';

// const upLoad =
export async function POST(request:any,){
    await dbConnect();
    const upLoad= multer({
            storage:multer.diskStorage({
                destination:function(req,file,cb){
                    // in cb method we are provide the two method one is null and other one is where we want to upload the file that folder name
                    cb(null, 'uploadPdf')
                },
                filename: function(req,file,cb){
                    cb(null,file.fieldname+'-'+Date.now()+',pdf')}
            })
        }).single(request);
        const data = new User(upLoad)
        console.log(upLoad)
        const result = await data.save();

    return NextResponse.json({result:result});


}