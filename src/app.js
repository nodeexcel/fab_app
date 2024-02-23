import express from 'express'
import cors from 'cors';
import { dbConnection } from './config/database/dbConfig.js';
import userRouter from './api/routes/user.js';
import requirementRouter from './api/routes/requirement.js';
import exhibitionRouter from './api/routes/exhibition.js';
import env from 'dotenv';

env.config();
const app = express();

//global middleware
app.use(express.json());
app.use(cors());

app.use('/images', express.static('src/uploads'))

//database connection
dbConnection();

//routes
app.use('/api/v1/user' , userRouter)
app.use('/api/v1/requirement' , requirementRouter)
app.use('/api/v1/exhibition' , exhibitionRouter)

//initialize server
app.listen(process.env.SERVER_PORT, ()=>console.log(`server is running on post: ${process.env.SERVER_PORT}`));



