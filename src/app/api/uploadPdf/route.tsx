import { NextResponse } from 'next/server';
import user from '../../../../models/user';
import dbConnect from '../../../../config/dbconnect';

export async function POST(request: any,) {
    try {
        await dbConnect()
        const data = await request.formData()
        const file = data.get('file');
        if (!file) {
            return NextResponse.json({ "massage": 'file not found ', success: false })
        }
        const byteData = await file.arrayBuffer();
        const buffer = Buffer.from(byteData);
        const pdfStore = new user({ pdfFile: buffer }).save();
        return NextResponse.json({ result: pdfStore, success: true })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ result: err })
    }
}
