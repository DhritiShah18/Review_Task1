const express=require("express")
const permission=require('../Schema/permission')

const router=express.Router()

//create permission
router.post('/', async (req, res) => {
    try {
      const newPermission = {
        name: req.body.name,
      };
  
      const newcon = await permission.create(newPermission);
  
      return res.status(201).json({ success: true, message: "Permission created successfully" });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  });
  
  //retrive permission
  router.get('/',async(req,res)=>{
      try{
        const permissions=await permission.find({})
        return res.status(200).json(permissions)
      }
      catch(error){
        console.log(error.message)
        res.send({message:error.message})
      }
      
    })

module.exports=router