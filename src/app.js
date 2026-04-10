const express = require("express");
const {connectDB}  = require("./config/database");
const app = express();
const User =  require("./models/user");

app.use(express.json());


app.post("/signup", async (req,res)=>{
  const user = new User(req.body);


  try {
     await user.save();
  res.send("User added successfully")

  } catch(err){
    res.status(400).send("Error saving the user : " + err.message);
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


