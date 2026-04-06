const express = require("express");

const app = express();

// app.use((req,res)=>{
//     res.send("Hello from the server");
// })

app.use('/hello',(req,res)=>{
    res.send("Hello gaurav singh sirari ji");
})


app.listen(3000,()=>{
    console.log("server is successfully listeining on port 3000");
    
});