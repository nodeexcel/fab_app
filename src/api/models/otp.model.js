import mongoose from 'mongoose';


const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        requird:true,
    },
    otp:{
        type:Number,
        requird:true,
    },
    createdAt: {
        type: Date,
        expires: 60, 
        default: Date.now
    }
})

export const Otp = mongoose.model('Otp', otpSchema);