// import required modules
const express = require('express');
const multer = require("multer");
const app = express();
const PORT = 8080

app.get("/", (req, res)=>{
    res.status(200).json({message: "welcome to server"})
})

app.listen(PORT, ()=>{
    console.log("app is running successfully");
});

// export the server
// eg.module.exports = app;
module.exports = app;