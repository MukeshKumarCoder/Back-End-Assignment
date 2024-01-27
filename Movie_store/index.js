const express = require("express");
const connection = require("./db");
const MoviesModel = require("./model/moviesModel");



const app = express();
const port = 8080;

app.use(express.json());
app.use("/movies", MoviesModel)



app.listen(port, async()=>{
    try {
        await connection
        console.log(`app is running at ${port} port and DB is also connected`);
    } catch (error) {
        console.log(`ERROR ${error}`);
    }
})