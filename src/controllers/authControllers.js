import User from "../models/userSchema.js";
import config from "../config/config.js";
import JWT from "jsonwebtoken"

export const cookieOptions={
    expires : new Date(Date.now()+3*24*60*60*1000),
    httpOnly : true     
}

export const signup = async (req,res)=>{
    try{

        const {name,email,password,phone,address}=req.body

        if (!name || !email || !password || !phone || !address){
            return res.status(400).json({
                success : false,
                message : "All the fields are required"
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(200).json({
                success : false,
                message : `You have already signed up,please login`
            })
        }

        const user = await User.create({
            name,
            email,
            password,
            phone,
            address
        })

        user.password = undefined
        res.status(200).json({
            success : true,
            message : "Successfully signed up",
            user
        })
            
    }catch (error){
        // console.log(`Error in signup ${error}`);
        res.status(500).json({
            success : false,
            message : "Error in signing up",
            error
        })
        
    }
}



export const login = async (req,res) =>{
    try{
        const {email,password}=req.body

        if(!email || !password){
            res.status(400).json({
                success : false,
                message : "Invalid email or password"
            })
        }

        const user = await User.findOne({email}).select("+password")
        if (!user){
            res.status(404).json({
                success : false,
                message :"please signup"
            })
        }

        const isPasswordMatch = await user.comparePassword(password)
        if (!isPasswordMatch){
            res.status(400).json({
                success : false,
                message : "Invalid Password"
            })
        }

        const token = JWT.sign({_id:user._id,role:user.role},config.JWT_SECRET,
            {expiresIn:config.JWT_EXPIRY}
        )

        res.cookie("token",token,cookieOptions)

        res.status(200).json({
            success:true,
            message:"Successfully logged in",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                phone :user.phone,
                address : user.address
            },
            token
        })

    }catch(error){
        // console.log(`Error in login ${error}`);
        res.status(500).json({
            success : false,
            message : "Error in login",
            error
        })
        
    }
}



export const logout = async (req,res) =>{
    try{
        res.cookie("token",null,{
            expires :new Date(Date.now()),
            httpOnly : true
        })

        res.status(200).json({
            success : true,
            message : "successfully loged out"
        })


    }catch(error){
        // console.log(`error in logout ${error}`);
        res.status(500).json({
            success : false,
            message : "error in logout",
            error
        })     
    }
}

