import express from "express"
import { login, logout, signup } from "../controllers/authControllers.js"

const router =express.Router()

// signup || method:post
router.post ("/signup",signup)
router.post ("/login",login)
router.post ("/logout",logout)


export default router