import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../../../config/dbconnect";
import { GridFSFile } from "mongodb";

export async function GET(requests: NextRequest) {
     try {
          let pdfFile: GridFSFile[] = [];
          const fileData = await connectToDb();
          const getBucket = fileData.bucket.find();
          for await (const file of getBucket) {
               pdfFile.push(file)
          }
          return NextResponse.json({ sucess: true, result: pdfFile });
     } catch (err) {
          return NextResponse.json({ sucess: false, message: err });
     }
}