const router = require('express').Router()
const admin = require('../model/adminModel')
const ViewBlog = require('../model/blog.model')
const { accessPage } = require('../utils/accessPage')

router.get("/",async(req,res)=>{
    // res.render("pages/index")
    const cookieAdmin = req.cookies.admin
    // console.log(cookieAdmin);
    const email = cookieAdmin.email
    const SingleAdmin= await admin.findOne({email})
    accessPage(req,res,"pages/index",{admin:SingleAdmin})
    
})
router.get('/AddBlog',async(req,res)=>{
    // res.render('pages/addBlog')
    const cookieAdmin = req.cookies.admin
    // console.log(cookieAdmin);
    const email = cookieAdmin.email
    const SingleAdmin= await admin.findOne({email})
    accessPage(req,res,"pages/addBlog",{admin:SingleAdmin})
})
router.get('/ViewBlog',async(req,res)=>{
    const ViewBlogs =await ViewBlog.find()
    const cookieAdmin = req.cookies.admin
    // console.log(cookieAdmin);
    const email = cookieAdmin.email
    const SingleAdmin= await admin.findOne({email})
    // console.log(ViewBlogs);
    accessPage(req,res,'pages/viewBlogs',{ViewBlogs,admin:SingleAdmin})
    
    // res.render('pages/viewBlogs',{ViewBlogs})
})
router.get('/Update',async(req,res)=>{
    const {id}= req.query
    // console.log(id);
    const singleBlog = await ViewBlog.findById(id)
    // console.log(singleBlog);
    res.render('pages/UpdateBlog',{singleBlog})

})

router.get('/register',async(req,res)=>{
    res.render('pages/register')
})
router.get('/login',async(req,res)=>{
    res.render('pages/login',{message:req.flash("info")})
})
router.get("/logout",(req,res)=>{
    res.clearCookie('admin')
    res.redirect('/')
})
router.get('/profile',async(req,res)=>{
    const cookieAdmin = req.cookies.admin
    // console.log(cookieAdmin);
    const email = cookieAdmin.email
    const SingleAdmin= await admin.findOne({email})

    res.render("pages/AdminProfile",{admin:SingleAdmin})
    // res.render("layout/header",{admin:SingleAdmin})

})
router.get("/changePass",async(req,res)=>{

    const email = req.cookies.admin
    // console.log(email);
    
    res.render("pages/changePassword",email)
})
router.get("",async(req,res)=>{

})
module.exports = router