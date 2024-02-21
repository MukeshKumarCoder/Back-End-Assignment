const express = require("express");
const {connection} = require("./db");
const { userRouter } = require("./routes/userRouter");
const { noteRouter } = require("./routes/noteRoutes");
 

const app = express();
const port = 4600;

app.use(express.json());
app.use("/users", userRouter);
app.use("/note", noteRouter)


app.get("/", (req, res)=>{
    try {
        res.send("welcole to Home page")
    } catch (error) {
        res.send({error: error})
    }
})


app.listen(port, async()=>{
    try {
        await connection
        console.log(`app is running at port ${port} db is also connected`);
    } catch (error) {
        console.log(error)
    }
})