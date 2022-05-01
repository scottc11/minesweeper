import mongoose from 'mongoose';
import { mongoURI } from './config/config';

export const connectDB = async (): Promise<mongoose.Connection> => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Mongo Atlas Connected 👌");
        return mongoose.connection;
    } catch (error: any) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message
        console.error(message);
        process.exit(1); // kill application
    }
}