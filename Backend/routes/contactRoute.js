

const express = require("express");
const contact = require('../Schema/contact');
const jwt = require('jsonwebtoken');
const authenticate = require('../Middleware/authorization');

const router = express.Router();

// Create contact
router.post('/', authenticate, async (req, res) => {
  try {
    const userId = req.userId;  // Access the userId set by the middleware

    const newContact = {
      name: req.body.name,
      phone: req.body.phoneNumber,
      Nickname: req.body.nickname,
      email: req.body.email,
      Address: req.body.address,
      Relationship: req.body.relationship,
      Notes: req.body.notes,
      owner: userId  // Assign the logged-in user's ID as the owner
    };

    const newcon = await contact.create(newContact);

    return res.status(201).json({ success: true, message: "Contact created successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});




//retrive user
router.get('/',async(req,res)=>{
    try{
      const contacts=await contact.find({})
      return res.status(200).json(contacts)
    }
    catch(error){
      console.log(error.message)
      res.send({message:error.message})
    }
    
  })

  //retrive user
router.get('/:id',async(req,res)=>{
  try{
    const userID=req.params.id
    // const {userID}=req.id
    console.log(req.params.id)
    const contacts=await contact.find({owner:userID})
    if(!contact){
      return res.json({success:false, message:"No contacts for this user"})

    }
    return res.status(200).json(contacts)
  }
  catch(error){
    console.log(error.message)
    res.json({success:false,message:error.message})
  }
  
})


  //update user
  router.put("/:id",async(req,res)=>{
      try{
      const {id}=req.params
      const numID=parseInt(id)
      if(isNaN(numID)) return res.status(400)
          const findContact= await contact.findByIdAndUpdate(id,req.body)
          if(!findContact) return res.status(404).send("Contact not found")
          const updatedContact=await contact.findById(id)
      return res.status(200).json({message:"Contact updated succesfully", user:updatedContact})
  }
  catch(error)
  {
      return res.send(error.message)
  }
  
  })


  //delete user
  router.delete('/:id', async (req, res) => {
      try{
        const { id } = req.params;
        const result = await contact.findByIdAndDelete(id);
        if(result){
          return res.json({success:true,message:"Contact deleted successfully"})
        }
        return res.json({success:false,message:"No contact found"})
    
    
      }
      catch(error){
        console.log(error.message)
      }
    })

module.exports=router