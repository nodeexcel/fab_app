import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

const secretKey =process.env.SECRET_KEY;

export const createToken = async(payload) => await jwt.sign(payload, secretKey);
export const verifyToken = async(accessToken) => await jwt.verify(accessToken, secretKey);
export const genrateOtp = ()=> Math.floor(1000 + Math.random() * 9000).toString();