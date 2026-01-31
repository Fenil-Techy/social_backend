import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import {userModel} from './models/user.js'
import {postModel} from './models/post.js'

const app=express()
connectDB()
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("home")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",(req,res)=>{
    const{name,username,email,password}= req.body
    bcrypt.hash(password,10, async (err,hash)=>{
        const user= await userModel.create({
            name,
            username,
            email,
            password:hash
        })
        res.redirect("/login")
    })
   
})

app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",async (req,res)=>{
    const{email,password}=req.body
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).send("email/password is invalid")
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).send("email/password is invalid")
    }
    const token = jwt.sign({id:user._id,email:user.email},"secret")
    res.cookie("token",token,{path:"/"})
    res.redirect("/")
})

const isLoggedIn=(req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
           return res.redirect("/login")
        }
        const decode=jwt.verify(token,"secret")
        req.user=decode
        next()
    } catch (error) {
        res.redirect("/login")
    }
}

app.get("/logout",(req,res)=>{
    res.clearCookie("token",{path:"/"})
    console.log("hit")
    res.redirect("/")
})

app.get("/createpost",isLoggedIn,(req,res)=>{
    res.render("createpost")
})
app.post("/createpost",(req,res)=>{
    
})

app.get("/profile",isLoggedIn, async (req,res)=>{
    const user= await userModel.findById(req.user.id)
    res.render("profile",{user})
})

app.listen(3000)