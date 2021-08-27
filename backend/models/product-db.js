const mongoose= require('mongoose')



const productSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true,
            maxlength:32
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category',
            required:true
        },
        code:{
            type:String,
            required:true,
        },
        yield:{
            type:String,
           },
        ingredients:{
            type:Array,
            default:[]
        },
        preparetime:{
            type:String,
        },
       dough_type:{
            type:String
        },
        taste_type:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            default:2.0
        },
        image:{
            type:String,
            default:''
        }
    },{timestamps:true}

)

exports.Product=mongoose.model('Product',productSchema);









/*
userSchema.virtual('password')
           .set(function(password){
               this._password=password;
               this.salt=uuidv();
               this.hashed_password=this.encryptPassword(password);
           })
           .get(function(){
               return this._password;
           });*/