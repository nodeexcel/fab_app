import mongoose from 'mongoose';


const profileSchema = new mongoose.Schema({
    companyName:{
        type:String
    },
    mobileNumber:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    zipcode:{
        type:Number
    },
    websiteLink:{
        type:String,
    },
    profileImage:{
        type:String,
        default:""
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

}, {timestamps:true})

export const Profile = mongoose.model("Profile", profileSchema)