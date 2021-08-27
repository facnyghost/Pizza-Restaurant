const express= require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const app=express()
const cors= require('cors');
const authJwt=require('./helper/jwt')
const bodyParser = require('body-parser')
const expressValidator= require('express-validator');
const cookieParser =require('cookie-parser')
app.use(cors());
app.options('*',cors());
require('dotenv').config({path: '.env'})

//database connection
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'netflixy'
})
.then(()=>{
    console.log('Database Connection is Successfully..........');
})
.catch((error)=>{
    console.log(error);
})



//middleware 

app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(expressValidator())
app.use('/public/uploads',express.static(__dirname+'/public/uploads/'))
app.use(authJwt());
//routes
const usersRoutes= require('./routes/users-api');
const categoryRoutes=require('./routes/category-api')
const productRoutes= require('./routes/product-api')
const orderRoutes= require('./routes/order-api')
const braintreeRoutes=require('./routes/braintree');
// const { PayPalAccount } = require('braintree');

//api
api= process.env.API
app.use(`${api}/users`,usersRoutes)
app.use(`${api}/categories`,categoryRoutes)
app.use(`${api}/products`,productRoutes)
app.use(`${api}/orders`,orderRoutes)
app.use(`${api}/braintree`,braintreeRoutes)



//server

const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log('Server is fire now..............')
})