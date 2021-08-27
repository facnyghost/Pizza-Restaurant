const mongoose =require('mongoose')


const CartItemsSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    name:String,
    price:Number,
    count: Number
},{timestamps:true})

const CartItems = mongoose.model('CartItems', CartItemsSchema)

const orderSchema =  mongoose.Schema({
    products:[CartItemsSchema],
    transaction_id:{},
    amount:{type:Number},
    address:String,
    status:{
        type:String,
        default:"NOT Processed",
        enum:['Not Processed' , 'Processing', 'Shipped' , 'Delivered' , 'Cancelled']
    },
    update:Date,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Order = mongoose.model('Order', orderSchema);
module.exports ={Order,CartItems}