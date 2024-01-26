// import required modules
const express = require('express');
const fs = require("fs");
const app = express();
const PORT = 8080

app.get("/", (req, res)=>{
    res.status(200).json({message: "welcome to server"})
})

app.get("/get-users", (req, res)=>{
    res.status(200).json({message: "here is the list of all users"})
})

app.listen(PORT, ()=>{
    console.log("app is running successfully");
});

// export the server
// eg.module.exports = app;
module.exports = app;