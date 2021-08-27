const mongoose =require('mongoose');

const categorySchema= mongoose.Schema({
    root_name:{
        type:String,
        required:true
    },
    child_name:{
        type:String,
        required:true
    }
})

exports.Category = mongoose.model('Category', categorySchema);