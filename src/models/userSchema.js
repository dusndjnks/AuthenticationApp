import mongoose  from "mongoose";
import bcrypt from "bcrypt"
import AuthRoles from "../utils/AuthRoles.js";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"name is required"],
        maxLength : [20,"name should not exceed 20 characters"]
    },
    email : {
        type : String,
        required : [true , "email is required"],
        unique : true
    },
    password : {
        type : String,
        required : [true , "password is required"],
        select : false,
        minLength : [8,"password shuold contain 8 characters"]
    },
    phone : {
        type : String,
        required : [true , "phone is required"]
    },
    address : {
        type : String,
        required :[true, "address is required"],
        maxLength : [80,"address should not exceed 80  characters"],
        trim  : true
    },
    role : {
        type : String,
        enum : Object.values.AuthRoles,
        default : AuthRoles.USER
    }
},{timestamps:true})


// mongoose hook
userSchema.pre("save",async function (next){
    if (!this.isModified("password"))return next()
        this.password = await bcrypt.hash (this.password,10)
})

// Schema method
userSchema.methods={
    comparePassword : async function (enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
    }
}

export default  mongoose.model("User",userSchema)