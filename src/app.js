import express from 'express'
import cors from 'cors';
import { dbConnection } from './config/database/dbConfig.js';
import userRouter from './api/routes/user.js';
import env from 'dotenv';

env.config();
const app = express();

//global middleware
app.use(express.json());
app.use(cors());


//database connection
dbConnection();

//routes
app.use('/api/v1/user' , userRouter)

//initialize server
app.listen(process.env.SERVER_PORT, ()=>console.log(`server is running on post: ${process.env.SERVER_PORT}`));



