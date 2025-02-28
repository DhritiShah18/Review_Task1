const express=require("express")
const team=require('../Schema/team')


const router=express.Router()

//create team
router.post('/',async(req,res)=>{
  try{
    const newTeam={
                    name: req.body.name,
                    members: req.body.members, 
                    Permissions:req.body.permissions
                  }
                  const newTeams = await team.create(newTeam);
                
                  await newTeams.save()
        
            return res.status(201).send(newTeams);
                }catch(error){
                  return res.json({ success: false, message: error.message });
                }

})


//retrive team for specific user
router.get('/:id',async(req,res)=>{
  try{
   
    const teamID=req.params.id
    const teams=await team.find({_id:teamID})
    console.log(teams)
    if(!teams){
      return res.json({success:false, message:"No contacts for this user"})

    }
    return res.status(200).json({teams})
  }
  catch(error){
    console.log(error.message)
    res.json({success:false,message:error.message})
  }
  
})


//retrive teams
router.get('/',async(req,res)=>{
    try{
      const teams=await team.find({})
      return res.status(200).json({success:true,message:teams})
    }
    catch(error){
      console.log(error.message)



      
     return res.json({message:error.message})
    }
    
  })


  //update teams
    router.put("/:id",async(req,res)=>{
        try{
        const id=req.params.id
        const numID=parseInt(id)
        if(isNaN(numID)) return res.status(400)
            const findContact= await team.findByIdAndUpdate(id,req.body)
            if(!findContact) return res.status(404).send("Team not found")
            const updatedContact=await team.findById(id)
        return res.status(200).json({message:"Contact updated succesfully", user:updatedContact})
    }
    catch(error)
    {
        return res.send(error.message)
    }
    
    })

  //delete 
    router.delete('/:id', async (req, res) => {
        try{
          const { id } = req.params;
          console.log(id)
          const result = await team.findByIdAndDelete(id);
          if(result){
            return res.json({success:true,message:"Team deleted "})
          }
          return res.json({success:false,message:"No team found"})
      
      
        }
        catch(error){
          console.log(error.message)
        }
      })

module.exports=router