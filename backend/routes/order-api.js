
const express = require('express')
const router = express.Router();
const {Order,CartItem} =require('../models/order-db')

router.get(`/`,async(req,res)=>{
    await Order.find()
                .populate(`user`,'_id name address')
                .sort('-created')
                .exec((error,orders) =>{
                    if(error){
                        return res.status(400).json({
                            error: "Some thing error wrong during reterive data"
                        })
                    }
                    res.json(orders);
                })
})

router.get('/:id',async(req,res)=>{
    await Order.findById(id)
    .populate('products.product' , 'name price')
    .exec((error,order)=>{
        if(error || !order){
            return res.status(400).json({error:'no order for this id'})
        }
        req.order= order;
        res.send(order);;
    })
})

router.post('/create',(req,res)=>{
    console.log('Create Order:' , req.body);
    req.body.order.user=req.profile;
    const order= new Order(req.body.order);
    order.save((error,data)=>{
        if(error){
            return res.status(400).json({error:'something wrong'})
        }
    })
})


router.get('/status',async(req,res)=>{
    res.json(Order.schema.path('status').enumValues)
})

router.put('/status_update',async(req,res)=>{
    await Order.update({_id:req.body.orderId} , {$set: {status:req.body.status}}, (error, order)=>{
        if(error){
            return res.status(400).json({
                error:'cannot update order status write now, try again later'
            })
        }
        res.json(order)
    })
})

module.exports= router;