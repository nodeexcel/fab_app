import nodemailer from 'nodemailer';
import env from 'dotenv';

env.config();

export const ackSender = async(email, acceptedBy) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: "Rquirement Acknowledged",
      html: `<div>
               <h2>Your Requirement Acknowledged</h2>
               <p>Hello,</p>
               <p>Your requirement is acknowledged by fabiricator <b>${acceptedBy.fullname}</b>.</p>
               <p><b>Fabricotor Details</b>.</p>
               <p>
                 Name : <b>${acceptedBy.fullname}</b>.<br>
                 Email : <b>${acceptedBy.email}</b>.<br>
               </p>  
            </div>`,
    };

    await transporter.sendMail(mailOptions);
}