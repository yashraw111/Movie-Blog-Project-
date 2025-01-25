const express = require("express");
const app = express();
const blogController = require("../controller/blog.controller");
const upload = require("../middleware/upload");
app.post("/CreateBlog",upload.single('MoviePoster'), blogController.CreateBlog);
app.get("/delete/:id", blogController.DeleteBlog);
app.post("/UpdateB/:id",upload.single('MoviePoster'), blogController.UpdateBlog);
module.exports = app;
