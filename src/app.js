const express = require("express");


const app = express();

const {adminAuth} = require('./middlewares/auth');

app.use('/admin',adminAuth);

app.get('/admin/getAllData',(req,res)=>{
    res.send("data sent")
});

app.get('/admin/deleteData',(req,res)=>{
    res.send("delete data")
});



app.listen(3000,()=>{
    console.log("server is successfully listeining on port 3000");
    
});