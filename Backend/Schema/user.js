const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
   email: {
    type:String,
    required:true
    },
    role:{
        type:String,
        default:"normal"
    },
    team:{
        type:[String],
        default:null,
    },
    permissions:{
        type:[String],
        default:["createContact"]
    }},{timestamps: true})
    module.exports=mongoose.model('User',userSchema)