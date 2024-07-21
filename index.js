const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express();
const dataRoute = require('./route/dataRoute')

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin:"*",
}));
dotenv.config();

app.use(express.json({limit:'10mb'}));


app.get("/",(req,res)=>{
    console.log("on :/")
    res.send("hello world");
})

app.use("/",dataRoute)



const connectdb = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("server is Connected");
    }
    catch(e){
        console.log("error while connecting DB")
    }
}

connectdb().then(()=>{
    app.listen(PORT,()=>{
        console.log("Listning");
    })
})