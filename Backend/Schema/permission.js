const mongoose=require("mongoose")

const permissionSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    }
})
module.exports=mongoose.model("permission",permissionSchema)