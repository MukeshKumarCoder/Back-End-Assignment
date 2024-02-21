// import required modules
const express = require('express');
const multer = require("multer");
const path = require("path");


const app = express();
const PORT = 8080

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, "uploads"));
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    },
});

const upload = multer({storage: storage});

//routes

app.get("/", (req, res)=>{
    res.status(200).json({message: "welcome to server"})
});

app.post("/upload", upload.single("file"), (req, res)=>{
    res.status(200).json({msg: "file uploaded successfully"});
});



app.listen(PORT, ()=>{
    console.log("app is running successfully");
});

// export the server
// eg.module.exports = app;
module.exports = app;