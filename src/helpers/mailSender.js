import { genrateOtp } from "../utils/user.js";
import nodemailer from 'nodemailer';
import env from 'dotenv';
import { userServices } from "../api/services/user/user.service.js";

env.config();

export const mailSender = async(email) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
    
    const otp = genrateOtp();
    await userServices.addOtp({email, otp});

    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: "Your OTP For Eamil Verification",
      html: `<div>
               <h2>Email Verification</h2>
               <p>Hello,</p>
               <p>Your one-time password (OTP) for verification is:<b> ${otp} </b></p>
               <p>Please use this OTP to verify your email address.</p>
               <p>This is an automated message. Please do not reply to this email.</p>
            </div>`,
    };

    await transporter.sendMail(mailOptions);
}