const { default: mongoose } = require("mongoose");
const BLOG_URL = "mongodb://localhost:27017/blog";
exports.main = () => {
  mongoose
    .connect(BLOG_URL)
    .then(() => {
      console.log("db connected ...");
    })
    .catch((err) => {
      console.log(err);
    });
};
