const Category = require("../model/category.model");

const addCategory = async (req, res) => {
  const { cat_name } = req.body;

  try {
    const existCategory = await Category.findOne({ cat_name: cat_name })
      .countDocuments()
      .exec();
    if (existCategory > 0) {
      return res.json({ error: "Category already exist" });
    } else {
      const newCategory = await Category.create({ cat_name });
    //   res.json({ message: "Category added successfully", newCategory });
    res.redirect('/viewCategory')
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const removeCategory = async(req,res)=>{
  const { id } = req.params;
  // console.log(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id)
    // console.log(deletedCategory);
    res.redirect('/viewCategory')
  } catch (error) {
    res.json({ error: error.message });
  }
  
}
const updateCategory = async(req,res)=>{
  const { id } = req.params;
  const { cat_name } = req.body;
  
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, { cat_name }, { new: true })
    // console.log(updatedCategory);
    res.redirect('/viewCategory')
  } catch (error) {
    res.json({ error: error.message });
  }
  
 
}
module.exports = { addCategory,removeCategory,updateCategory };
