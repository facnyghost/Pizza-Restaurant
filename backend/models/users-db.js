const mongoose= require('mongoose')



const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true,
            maxlength:32
        },
        email:{
            type:String,
            trim:true,
            required:true,
            unique:true
        },
        hashed_password:{
            type:String,
            required:true,
        },
        salt:String,
        isAdmin:{
            type:Boolean,
            default:false
           },
        history:{
            type:Array,
            default:[]
        },
        phone:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true
        }
    },{timestamps:true}

)

exports.User=mongoose.model('User',userSchema);









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