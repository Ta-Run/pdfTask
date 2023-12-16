import multer from 'multer';
import { NextResponse } from 'next/server';
import path from 'path';
import user from '../../../../models/user';
import dbConnect from '../../../../config/dbconnect';

export const config = {
    api: {
        bodyParser: false
    }
}

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploadPdf");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now + path.extname(file.originalname));
    },
})

const upLoad = multer({ storage: storage })
let upLoadFile = upLoad.single('fileName');

// make file upload api for make form data
// export async function POST(request: any,) {
//     try {
//         const data = await request.formData()
//         await upLoadFile(request as any, {} as any, async (err) => {

//             if (err) {
//                 console.log('check ', request)
//             }
//             // const { originalname, filename, mimetype } = request.file;
//             console.log(request.file)
//         })
//         return NextResponse.json({ result: 'work' })
//     } catch (err) {
//         console.log(err)
//         return NextResponse.json({ result: err })
//     }
// }

export async function POST(request: any) {
    try {
        await dbConnect()

        const payload = await request.json();
        console.log(payload)
        let uploadFile = {
            pdfFile: payload.file
        }
        let data = new user(uploadFile)
        let result = await data.save();
        return NextResponse.json({ result: result, success: true })

    } catch (err) {
        return NextResponse.json({ message: err })
    }
}