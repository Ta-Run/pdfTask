import multer from 'multer';
import dbConnect from '../../../../config/dbconnect';
import { NextResponse } from 'next/server';

const upLoad = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            // in cb method we are provide the two method one is null and other one is where we want to upload the file that folder name
            cb(null, 'uploadPdf')
        },
        filename: function(req,file,cb){
            cb(null,file.fieldname+'-'+Date.now()+',pdf')}
    })
}).single('user_file');
export async function POST(request:any,){
    await dbConnect();
    return NextResponse.json({result:upLoad});


}