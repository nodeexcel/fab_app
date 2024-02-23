import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        requird:true,
    },
    email:{
        type:String,
        requird:true,
    },
    password:{
        type:String,
        requird:true,
    },
    role:{
        type:String,
        required:true
    }
})

export const User = mongoose.model('User', userSchema);