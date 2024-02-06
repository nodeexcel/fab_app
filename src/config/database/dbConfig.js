import mongoose from 'mongoose'
import env from 'dotenv';

env.config();

export const dbConnection = async()=>{
     try {
        await mongoose.connect(process.env.DB_URL);
        console.log("database connected successfully")
     } catch (error) {
        console.log(error.message)
     }
}