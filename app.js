require('dotenv').config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 4002;

const route_path = require("./routes/products") 

app.get("/",(req,res)=>{
  res.send("Hi I am Live");
})


//middleware
app.use("/api/products",route_path)

const start = async () => {
  try{
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT,()=>{
      console.log(`${PORT} is running`);
    })
  }catch(error){
    console.log(error);
  }
}

start();