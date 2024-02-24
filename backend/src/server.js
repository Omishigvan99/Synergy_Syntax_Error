const express = require('express');
const app=express()

app.get("/data",(req,res)=>{
    res.json({
        msg:"hello its working"
    })
})

app.listen(process.env.PORT,()=>{
    console.log("Server started on port no. 8888")
})