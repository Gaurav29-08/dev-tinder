const express = require("express");

const app = express();



app.get('/user/:userID/:name/:password',(req,res)=>{
    console.log(req.params);
    
    
    res.send({firstName:"Gaurav",lastName:"sirari"})
})

app.post("/user",(req,res)=>{
    res.send("Data successfully saved");
})

app.delete('/user',(req,res)=>{
    res.send("deleted successfully")
})


app.use('/test',(req,res)=>{
    res.send("Hello testing");
    
});






app.listen(3000,()=>{
    console.log("server is successfully listeining on port 3000");
    
});