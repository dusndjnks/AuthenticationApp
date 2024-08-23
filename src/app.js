import express from "express"
import authRoutes from "./routes/authRoutes.js"
// import crypto from "crypto"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

const app=express()


// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname,"../client/build")))





// Routes
app.use("/api/v1/auth",authRoutes)



// generate secret key
// const key=crypto.randomBytes(64).toString("hex")
// console.log(key);

app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,"../client/build/index.html"))
})



export default app