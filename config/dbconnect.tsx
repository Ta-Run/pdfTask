import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: Mongoose | undefined;
    }
  }
}

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (MONGODB_URI === undefined) {
  throw new Error('Please define Mongo DB URI');
}
let cached = global.mongoose;

if (!cached) {
  cached = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
