const  {Product}  = require('../models/product-db');
const express = require('express')
const router = express.Router();
const multer= require('multer');
const { Category } = require('../models/category-db');


const FILE_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'    
}

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError= new Error('invalid image type')
        if(isValid){
            uploadError =null
        }
        cb(uploadError,'public/uploads/')
    },
    filename:function(req,file,cb){
        const filename = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null,`${filename}`);
    }
})

const uploadOptions = multer({storage:storage});

router.get(`/`,async(req,res)=>{
    let order= req.query.order ? req.query.order :'asc';
    let sortBy= req.query.sortBy ? req.query.sortBy: '_id';
    let limit =req.query.limit ? parseInt(req.query.limit) : 6;

    await Product.find().select('-ingredients').populate('category').sort([[sortBy,order]]).limit(limit).exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:'Products not found'
            })
        }
        res.json(products)
    })
    
})


router.get(`/:id`,async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        res.status(400).json({success:false, error:'there is no category with this id'})
    }
    res.status(200).send(product)
})

router.get(`/related/:id`,async(req,res)=>{
   let limit = req.query.limit ? parseInt(req.query.limit) :6;
    const ne_product = await Product.findById(req.params.id);
   await Product.find({_id:{$ne :ne_product}, category:ne_product.category})
    .limit(limit)
    .populate('category','_id name')
    .exec((err,products) =>{
        if(err){
            return res.status(400).json({
                error:'Products not found and no related!!!'
            })
        }
        res.json(products);
    })

})   ///example root_name:main_dish child_name:pizza code:PZ050
///2 root_name:drinks child-name:coffee code:HT060
router.post(`/new_product`,uploadOptions.single('image'),async(req,res)=>{
const category = await Category.findById(req.body.category);
if(!category) return res.status(400).json({error:'Invalid Category'})

const file =req.file;
if(!file) return res.status(400).json({error:'no images founded'})
const fileName=file.filename;
const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    let new_product= new Product({
        name:req.body.name,
        category:req.body.category,
        code:req.body.code,
        yield:req.body.yield,
        ingredients:req.body.ingredients,
        preparetime:req.body.preparetime,
        dough_type:req.body.dough_type,
        taste_type:req.body.taste_type,
        price:req.body.price,
        image:`${basePath}${fileName}`
    })    
    new_product=await new_product.save();
    if(!new_product){
        return res.status(400).json({error:'some thing wrong'})
    }
    res.send(new_product)
})

router.put(`/update/:id`, async(req,res)=>{
    const product=await Product.findByIdAndUpdate(
        req.params.id,
        {
                name:req.body.name,
                category:req.body.category,
                code:req.body.code,
                yield:req.body.yield,
                // ingredients:req.body.ingredients,
                preparetime:req.body.preparetime,
                dough_type:req.body.dough_type,
                taste_type:req.body.taste_type,
                price:req.body.price
           
        
        },{new:true}
    )
    if(!product){
        return res.status(400).json({error:'cant update this product'})
    }
    res.send(product)
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


/*
router.get(`/search`,(req,res)=>{
    let order= req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs= {}

    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0){
            if(key === 'price'){
                findArgs[key]
            }
        }
    }


})

*/


module.exports= router;