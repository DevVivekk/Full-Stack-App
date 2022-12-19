const mongoose = require('mongoose');
require("dotenv").config();
const  jwt = require('jsonwebtoken')
const bycrpt = require('bcryptjs')
mongoose.connect(process.env.MONOGO_URI,{useUnifiedTopology: true})
.then((done)=>{
    console.log('connected..')
})
.catch((e)=>{
    console.log(e);
})

const mongooseSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  confirmpassword:{
    type:String,
    required:true
  },

  messages:[
    {
      name:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true
      },
      message:{
        type:String,
        required:true
      } 
    }
  ],
  comments:[
    {
      comment:{
        type:String
      }
    }
  ],
  tokens:[
    {
        token:{
            type:String,
            required:true
        }
    }
  ]
},{timestamps:true})

mongooseSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password= await bycrpt.hash(this.password,12);
        this.confirmpassword= await bycrpt.hash(this.confirmpassword,12);
    }
    next();
})

mongooseSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens =this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(e){
        console.log(e);
    }
}
//storing message...when both key value are same then name,email etc..
mongooseSchema.methods.addMessage = async function(name,email,message){
  try{
    this.messages= this.messages.concat({name,email,message})
    await this.save();
    return this.messages;
  }catch(e){
    console.log(e);
  }
}

mongooseSchema.methods.addComments = async function(comment){
  try{
    this.comments= this.comments.concat({comment})
    await this.save();
    return this.comments;
  }catch(e){
    console.log(e);
  }
}
const usermodel = new mongoose.model('userdata',mongooseSchema)
module.exports = usermodel;


//hashing the password.....