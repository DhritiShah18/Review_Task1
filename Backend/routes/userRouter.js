const express = require("express")
const User=require('../Schema/user')
const bcrypt=require("bcrypt")
const router=express.Router()

router.post('/',async(req,res)=>{
    try{
      const rounds=3
      const hashedPassword=await bcrypt.hash(req.body.password,rounds)
        const newuser={
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            // role: req.body.role,
            // team:req.body.team,
            // permissions:req.body.permissions,
          }
         
          const user = await User.create(newuser);

    return res.status(201).json({success:true,message:"Sign Up successfully"});

    }
    catch(error){
        console.log(error.message)
        res.json({success:false,message: error.message})
    }
})

//to see all data
router.get('/',async(req,res)=>{
    try{
      const user=await User.find({})
      return res.status(200).json(user)
    }
    catch(error){
      console.log(error.message)
      res.send({message:error.message})
    }   
  })
  

//update user
  router.put("/:id",async(req,res)=>{
      try{
      const {id}=req.params
      const numID=parseInt(id)
      if(isNaN(numID)) return res.status(400)
          const findUser= await User.findByIdAndUpdate(id,req.body)
          if(!findUser) return res.status(404).json({success:false,message:"User not found"})
          const updatedUser=await User.findById(id)
      return res.status(200).json({success:true,message:"User updated succesfully", user:updatedUser})
  }
  catch(error)
  {
      return res.json({success:false,message:error.message})
  }
  
  })


  //delete user
  router.delete('/:id', async (req, res) => {
      try{
        const { id } = req.params;
        const result = await User.findByIdAndDelete(id);
        if(result){
          return res.json({success:true,message:"User deleted "})
        }
        return res.json({success:false,message:"No user found"})
    
    
      }
      catch(error){
        console.log(error.message)
      }
    })
  module.exports=router
//export default router;
