const {Category}  = require('../models/category-db');
const express = require('express')
const router = express.Router();


router.get(`/`,async(req,res)=>{
    const categoryList=await Category.find();
    if(!categoryList){
        res.status(400).json({success:false, error:'there is no categories found'})
    }
    res.status(200).send(categoryList)
})


router.get(`/:id`,async(req,res)=>{
    const category=await Category.findById(req.params.id);
    if(!category){
        res.status(400).json({success:false, error:'there is no category with this id'})
    }
    res.status(200).send(category)
})
///example root_name:main_dish child_name:pizza code:PZ050
///2 root_name:drinks child-name:coffee code:HT060
router.post(`/new_category`,async(req,res)=>{
    let category= new Category({
        root_name:req.body.root_name,
        child_name:req.body.child_name,
    })
    category= await category.save();
    if(!category){
        return res.status(400).json({error:'The category cannot be created!'})
    }
    res.send(category);
})

router.put(`/update/:id`, async(req,res)=>{
    const category=await Category.findByIdAndUpdate(
        req.params.id,
        {
            root_name:req.body.root_name,
            child_name:req.body.child_name,
              
        },{new:true}
    )
    if(!category){
        return res.status(400).json({error:'cant update this category'})
    }
    res.send(category)
})

router.delete(`/delete/:id`,async(req,res)=>{
    await Category.findByIdAndRemove(req.params.id).then(
        cate=>{
            if(cate){
                return res.status(200).json({success:true,error:'no error'})
            }
            else{
                return res.status(400).json({success:false,error:'cant remove this category'})
            }
        }
    )
    .catch(error=>{
        return res.status(400).json({error:'some thing wrong'})
    })
})


module.exports= router;