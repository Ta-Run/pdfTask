import { connectToDb, fileExists } from "../../../../config/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import { GridFSFile } from "mongodb";

export async function POST(req: Request) {
  const { bucket } = await connectToDb();
  const data = await req.formData();
  for (const entry of Array.from(data.entries())) {
    const [key, value] = entry;
    const isFile = typeof value == "object";
     if (isFile) {
      const blob = value as unknown as Blob;
      const filename = blob.name;
      const existing = await fileExists(filename);
      if (existing) {
        continue;
      }
      const buffer = Buffer.from(await blob.arrayBuffer());
      const stream = Readable.from(buffer);
      const uploadStream = bucket.openUploadStream(filename, {
        contentType: blob.type,
        metadata: {},
      });

      await stream.pipe(uploadStream);
    }
  }
  return NextResponse.json({ success: true });
}

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