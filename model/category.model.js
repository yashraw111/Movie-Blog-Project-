const {Schema,model} = require('mongoose')

const CategorySchema = Schema({
    cat_name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    }
})

const Category = model('Category',CategorySchema)

module.exports = Category