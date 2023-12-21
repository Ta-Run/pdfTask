import { connectToDb, fileExists } from "../../../../config/dbconnect";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req: Request) {
  const { bucket } = await connectToDb();
  const data = await req.formData();
  for (const entry of Array.from(data.entries())) {
    const [key, value] = entry;
    const isFile = typeof value == "object";
    if (isFile) {
      const blob = value as unknown as Blob;
      const filename = blob.name;
      console.log(filename)
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
