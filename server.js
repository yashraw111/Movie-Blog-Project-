const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000
const cookieParser = require('cookie-parser')
require('./config/db').main()
app.set('view engine',"ejs")
app.use(express.json())
app.use("/images",express.static('uploads'))
const flash = require('express-flash')
const session = require("express-session")
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
const View = require('./routes/view_routes')
const BlogRoutes = require('./routes/blog.routes')
// app.get('/', (req, res) => res.send('Hello World!'))
const adminRoutes = require('./routes/admin.routes')
const CategoryRoutes = require('./routes/category.routes')
app.use(session({
    secret:"keyboard cat ",
    resave:false,
    saveUninitialized:true
}))
app.use(flash())

app.use(cookieParser())
app.use('/admin',adminRoutes)
app.use('/',View)
app.use('/blog',BlogRoutes)
app.use('/category',CategoryRoutes)
app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`))