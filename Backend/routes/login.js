const express=require("express")
const User=require('../Schema/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const router=express.Router()
router.post('/',async (req,res)=>{
    try{
        if(!req.body.username || !req.body.password){
            return res.json({success:false,message:"Enter both fields"})
        }
        // console.log(req.body)
        const loginUser=await User.findOne(
            {
                username:req.body.username,
                // password:req.body.password
            }
        )
        if(!loginUser){
            return res.json({success:false,message:"Your account dosen't exist. PLease signup first"})
        }
        const isMatch=await bcrypt.compare(req.body.password,loginUser.password)
        if(!isMatch){
            return res.json({success:false,message:"Your account dosen't exist. PLease signup first"})
        }
        const token = jwt.sign(
            { userId: loginUser._id },  
            process.env.JWT_SECRET,  
            { expiresIn: '25d' }  
          );
        //   console.log(token)

        return res.status(200).cookie("token",token).json({success:true,message: "Login sucesfully", token:token})

    }
    catch(error){
        console.log(error.message)
        res.status(500).send(error.message)
    }
})


module.exports=router