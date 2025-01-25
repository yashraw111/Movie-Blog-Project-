const { Schema, model } = require("mongoose");

const common = {
  type: String,
  required: true,
  trim: true,
};

const blogSchema = new Schema(
  {
    category: common, 
    title: common,
    description: {
      type: String,
      required: true,
      trim: true,
    },
    author: common, 
    // imageUrl: {
    //   type: String,
    //   trim: true,
    // }, 
    publishDate: {
      type: Date,
    },
    MoviePoster:String
  },
  {
    timestamps: true,
  }
);

const Blog = model("Blog", blogSchema);

module.exports = Blog;
