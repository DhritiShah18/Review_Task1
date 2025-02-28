const dotenv=require('dotenv')
const express= require("express")
const mongoose = require("mongoose");
const userRoute = require("./routes/userRouter")
const loginRoute=require("./routes/login")
const contactRoute=require('./routes/contactRoute')
const teamRoute=require("./routes/teamRoute")
const permissionRoute=require("./routes/permissionRoute")
const cors=require("cors")

const app=express()

app.use(cors());
app.use(express.json());

//routes
app.use("/users", userRoute);
app.use("/signup", userRoute);
app.use("/login",loginRoute);
app.use("/Contact",contactRoute);
app.use("/teams",teamRoute)
app.use("/permissions",permissionRoute)

//Database conection
dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to Db")
})
.catch(()=>{
    console.log("Error")
})
app.listen(3000, () => console.log("Server is running"))

