const Blog = require("../model/blog.model");
const path = require("path");
const fs = require("fs");
const CreateBlog = async (req, res) => {
  //   console.log(req.file);
  //   console.log(req.body);

  try {
    const MoviePoster = req?.file?.filename;
    // console.log(MoviePoster);

    const { category, title, description, author, publishDate } = req.body;

    const blog = await Blog.create({
      category,
      title,
      description,
      author,
      publishDate,
      MoviePoster,
    });
    res.redirect("/ViewBlog");
  } catch (error) {
    console.log(error);
  }
};

const DeleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Blog.findById(id);
    //  console.log(movie);
    if (movie.MoviePoster) {
      const imagePath = path.join(__dirname, `../uploads/${movie.MoviePoster}`);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log("failed to delete banner image");
        }
      });
      await Blog.findByIdAndDelete(id);
    }

    res.redirect("/ViewBlog");
  } catch (error) {
    console.log(error);
  }
};

const UpdateBlog = async (req, res) => {

  try {
    const { id } = req.params;
    //  console.log(MoviePoster);
      const { category, title, description, author, publishDate } = req.body;
     const movie = await Blog.findById(id);
   var  MoviePoster=req?.file?.filename;
   
   if(MoviePoster !== undefined){
      if (movie.MoviePoster) {
         const imagePath = path.join(__dirname, `../uploads/${movie.MoviePoster}`);
   
         fs.unlink(imagePath, (err) => {
           if (err) {
             console.log("failed to delete banner image");
           }
         });
          await Blog.findByIdAndUpdate(
         { _id: id },
         { category, title, description, author, publishDate, MoviePoster }
       );
       res.redirect("/ViewBlog");
       }
      
   }
   else{
    await Blog.findByIdAndUpdate(
      { _id: id },
      { category, title, description, author, publishDate }
    );
      res.redirect("/ViewBlog")
   }
    
    
  } catch (error) {
    console.log(error);
  }
};
module.exports = { CreateBlog, DeleteBlog, UpdateBlog };
