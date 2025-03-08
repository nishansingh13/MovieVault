import mongoose from "mongoose";
import colors from 'colors';

const connectDB= async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline);
    }
    catch(err){
        console.log(`Error is ${err.message}`.red); 
        process.exit(1);
    }
}
export default connectDB;