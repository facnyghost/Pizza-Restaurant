 const {User} =require('../models/users-db')
 const express= require('express')
 const router=express.Router()
 const bcrypt=require('bcryptjs')
 const jwt=require('jsonwebtoken')



 ///List all Users 
 router.get(`/`, async (req,res)=>{
    await User.find()
     .select('-hashed_password')
     .exec((error,usersList) =>{
         if(error || !usersList){
             return res.status(400).json({
                 error:'Users not found'
             });
         }
         res.status(200).send(usersList)
     })
    
 })

/// signup

router.post('/signup',async (req,res)=>{
    let newuser=new User({
        name:req.body.name,
        email:req.body.email,
        hashed_password:bcrypt.hashSync(req.body.password,5),
        phone:req.body.phone,
        address:req.body.address
    })
    await newuser.save((error,user)=>{
        if(error){
            return res.status(400).json({
                error:'Email is taken before'
            })
           }
           res.status(200).send(newuser);
    })
})

///signin

router.post(`/signin`,async(req,res)=>{
    const user = await User.findOne({email:req.body.email})
    const secret= process.env.SECRET;
    if(!user){
        return res.status(400).json({error: 'This User not found'});
    }
    if(user && bcrypt.compareSync(req.body.password, user.hashed_password)){
        const token=jwt.sign({
            userId:user._id,
            isAdmin:user.isAdmin
        },
        secret,
        {expiresIn:'10h'})
        
        res.status(200).json({user_email:user.email,user_name:user.name,userId:user._id,isAdmin:user.isAdmin, token:token})
    }
    else{
        res.status(400).json({error: "This Email and Password don't match"})
    }
})

router.get(`/signout`,async(req,res)=>{
    res.clearCookie('t');
    res.json({message:'Signout success'})
})

//get specifi user

router.get(`/:id`,async (req,res)=>{
    const user =await User.findById(req.params.id).select('-hashed_password');
    if(!user){
        res.status(400).json({error:' There is no user for this id'})
    }
    res.status(200).send(user);
})

//update user
router.put(`/update/:id`,async(req,res)=>{
    const userExist= await User.findById(req.params.id);
    let newPassword
    if(req.body.password){
        newPassword=bcrypt.hashSync(req.body.password,5)
    }
    else{
        newPassword=userExist.hashed_password
    }
    const user= await User.findByIdAndUpdate(

        req.params.id,
        {
            name:req.body.name,
            email:req.body.email,
            hashed_password:newPassword,
            phone:req.body.phone,
            address:req.body.address
        },{new : true}
    )
  

    if(!user){
        return res.status(400).json({error:'There is something wrong try again'})
    }
    res.send(user);
})
///remove user
router.delete(`/delete/:id`,async(req,res)=>{
    User.findByIdAndRemove(req.params.id).then(result=>{
        if(result){
            return res.status(200).json({success:true, error:'no error'})
        }
        else{
            return res.status(400).json({success:false, error:'cant remove this user make sure data is true'})            
        }
    })
    .catch(error=>{
        return res.status(400).json({success:false, error:'cant find this id'})            
        
    })
})



///accounts counter

router.get(`/get/count`,async(req,res)=>{
    const usercount=await User.countDocuments((count) => count)
    if(!usercount){
         res.status(400).json({success:false, error:'some thing wrong'})            
    }
    res.send({usercount:usercount})
})


module.exports =router;