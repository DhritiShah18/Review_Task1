const express=require("express")
const { default: mongoose } = require("mongoose")
const team=require('../Schema/team')

const router=express.Router()

//create team
router.post('/',async(req,res)=>{
    const newTeam={
                    name: req.body.name,
                    members: req.body.mem, 
                  }
                  const newTeams = await team.create(newTeam);
        
            return res.status(201).send(newTeams);

})


//retrive team
router.get('/',async(req,res)=>{
    try{
      const teams=await team.find({})
      return res.status(200).json(teams)
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
            return res.send("Deleted")
          }
          return res.send("Not found")
      
      
        }
        catch(error){
          console.log(error.message)
        }
      })

module.exports=router