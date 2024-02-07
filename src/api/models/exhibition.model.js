import mongoose from 'mongoose';


const exhibitionSchema = new mongoose.Schema({
    title:{
        type:String,
        requird:true,
    },
    eventDate:{
        type:String,
        requird:true,
    },
    venue: {
        type: String
    },
    timePeriod: {
        type: String
    },
    description: {
        type: String
    },
    imageURL: {
        type: String
    }
}, {timestamps:true})

export const Exhibition = mongoose.model('Exhibition', exhibitionSchema);