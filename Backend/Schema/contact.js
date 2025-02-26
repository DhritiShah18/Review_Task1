const mongoose = require("mongoose");

const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
    },
    Nickname:{
        type:String,
    },
    Address:{
        type:String,
    },
    Relationship:{
        type:String,
    },
    Notes:{
        type:String,
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps: true})
module.exports=mongoose.model("Contact",contactSchema)