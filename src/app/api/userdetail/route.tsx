import { NextResponse } from 'next/server';
import User from '../../../../models/user';
import dbConnect from '../../../../config/dbconnect';

// eslint-disable-next-line import/no-anonymous-default-export
// export async function GET(req:any,NextApiResponse:NextApiResponse)  {
//      try {
//       console.log("wait for db");
//       await dbConnect();
//       console.log("connected");
//       const { method } = req;
//       switch (method) {
//          case 'GET':
//             NextApiResponse.status(200).json({result:true})

//             try {
//                const userdata = await User.find({});
//                console.log(userdata);
//                NextApiResponse.status(200).json({ success: true, result: userdata });
//             } catch (err) {
//                console.error('Error fetching user data:', err);
//                NextApiResponse.status(404).json({ success: false, error: 'Internal Server Error' });
//             }
//             break;
//          default:
//             NextApiResponse.status(405).json({ success: false, error: 'Method Not Allowed' });
//             break;
//       }
//    } catch (error) {
//       console.error('Error connecting to the database:', error);
//       NextApiResponse.status(500).json({ success: false, error: 'Internal Server Error' });
//    }
// };

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