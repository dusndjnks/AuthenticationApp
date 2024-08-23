import app from "./src/app.js";
import config  from "./src/config/config.js";
import mongoose from "mongoose";
import colors from 'colors'

(async ()=>{
    try{
        await mongoose.connect(config.MONGODB_URL)
        // console.log("Successfully connected to MongoDB".bgCyan.red);
    }catch(error){
        // console.log(`Error in DB connection ${error}`.bgRed.white);
    }-`-`
})()


const PORT = config.PORT
app.listen(PORT,()=>{
    console.log(`App is running at PORT:${PORT}`.bgRed.rainbow);
    
})
