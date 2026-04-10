const express = require("express");
const {connectDB}  = require("./config/database");
const app = express();
const User =  require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const user = require("./models/user");

app.use(express.json());


app.post('/login', async (req,res)=>{
  try {
    const {emailId,password} = req.body;

    const user = await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Email Id is not present in DB");
    }
    const isPAsswordValid = await bcrypt.compare(password,user.password);
    if(isPAsswordValid){
      res.send("Login successfully")
    } else {
      throw new Error("password is not correct")
    }
  }  catch(err){
    res.status(400).send("Error : "+err.message);
  }

});


app.post("/signup", async (req,res)=>{

  try {


  validateSignUpData(req);

  const {firstName,lastName,emailId,password} = req.body;

  const passwordHash = await bcrypt.hash(password,10);
  console.log(passwordHash);
  

  const user = new User({
    firstName,lastName,emailId,password:passwordHash
  });

  


  
     await user.save();
  res.send("User added successfully")

  } catch(err){
    res.status(400).send("Error : " + err.message);
  }
 
});


app.delete("/delete", async(req,res)=>{
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);

    res.send("user deleted successfully");
  } catch(err){
    res.status(400).send("Something went wrong")
  }
});


app.patch('/update/:userId', async (req,res)=>{
  const userId = req.params?.userId;
  const data = req.body;


  try{
    const AllowedUpdates = ["photoUrl","about","skills","age","gender"];

    const isAllowedUpdates = Object.keys(data).every((k)=>
      AllowedUpdates.includes(k));
    if(!isAllowedUpdates){
      throw new Error("Updates not allowed");
    }



    await User.findByIdAndUpdate({_id:userId},data,{
      runValidators : true,
    });
    res.send("updated sucessdully")
  } catch(err){
    res.status(400).send("update failed: "+err.message);
  }
})

app.get('/user',async (req,res)=>{
  const userEmail = req.body.emailId;
  try{
    const users = await User.find({emailId:userEmail});
    if(users.length===0){
      res.status(404).send("User not found")
    } else {
      res.send(users);
    }
    } catch(err){
      res.status(400).send("something went wrong")
    }
  
});

app.get('/feed', async (req,res)=>{
  try{
    const users = await User.find({});
    res.send(users);
  } catch {
    res.status(400).send("something went wrong");
  }
})

connectDB().then(()=>{
  console.log("Database connection established");
  
app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
  
}).catch((err)=>{
  console.log("Datbase can not be connected");
  
})


