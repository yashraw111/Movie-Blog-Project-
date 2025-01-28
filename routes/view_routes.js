const router = require('express').Router()
const admin = require('../model/adminModel')
const ViewBlog = require('../model/blog.model')
const { accessPage } = require('../utils/accessPage')
const Category = require('../model/category.model')

router.get("/",(req,res)=>{
    // res.render("pages/index")
    accessPage(req,res,"pages/index")
})
router.get('/AddBlog',async(req,res)=>{
    // res.render('pages/addBlog')
    const categories = await Category.find()
    accessPage(req,res,"pages/addBlog",{categories:categories})


})
router.get('/ViewBlog',async(req,res)=>{
    const ViewBlogs =await ViewBlog.find()
    // console.log(ViewBlogs);
    
    res.render('pages/viewBlogs',{ViewBlogs})
})
router.get('/Update',async(req,res)=>{
    const {id}= req.query
    const categories = await Category.find()
    // console.log(id);
    const singleBlog = await ViewBlog.findById(id)
    // console.log(singleBlog);
    
    res.render('pages/UpdateBlog',{singleBlog,categories})

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

})
router.get("/changePass",async(req,res)=>{

    const email = req.cookies.admin
    res.render("pages/changePassword",email)
})

router.get('/forgotPassword',async(req,res)=>{
    res.render('pages/forgotPassword',{message:req.flash("info")})
})

router.get('/addCategory',  async(req,res)=>{
    res.render('pages/addCategory')
})
router.get('/viewCategory', async(req,res)=>{
    const category = await Category.find()
    res.render('pages/viewCategory',{category: category})
})
router.get('/updateCategory',async(req,res)=>{
    const {id}= req.query
    const singleCategory = await Category.findById(id)
    res.render('pages/updateCategory',{singleCategory})
})
module.exports = router