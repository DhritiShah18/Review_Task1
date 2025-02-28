const mongoose=require("mongoose")

const teamSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    members:{
        type:[String],
        required:true
    },
    Permissions:[{
        type:[String],
        // default:null,
        required:true
    }]
},{timestamps: true})
module.exports=mongoose.model("teams",teamSchema)