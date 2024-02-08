import mongoose from 'mongoose';


const requirementSchema = new mongoose.Schema({
    stallSize:{
        type:String,
        requird:true,
    },
    stallNumber:{
        type:String,
        requird:true,
    },
    selectedColor:{
        type:String
    },
    products:{
        type:String
    },
    branding:{
        type:String
    },
    WoodenFlooring:{
        type:String
    },
    carpetColor:{
        type:String
    },
    furniture:{
        type:String
    },
    lighting:{
        type:String
    },
    budget:{
        type:String
    },
    comment:{
        type:String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps:true})

export const Requirement = mongoose.model('Requirement', requirementSchema);