const express = require("express");
const fs = require("fs");
const Validated = require("./validatemiddelware");
const logger = require("./loggermiddelware");

const Port = 8699; 

const server = express();


server.use(express.json());


server.get("/user",(req,res)=>{
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
console.log("welcome to home");

    res.json( { message:"welcome", data: data.user });
  
});


server.use(logger);




server.post("/user",Validated,(req,res)=>{
    try {
        const newUser = req.body;
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"));

    if(!Array.isArray(data.user)){
        data.user =[];
    }
     
    data.user.push(newUser);

    fs.writeFileSync("./db.json",JSON.stringify(data),"utf-8");

    console.log("user added");
    res.json({massegae:"data received"});
    } catch (error) {
        console.log("error");
        res.status(500).json({ message: "Internal server error" });
    }

   
});




server.listen(Port,()=>{
    console.log("server is running");
});