const mongoose = require('mongoose');
require("dotenv").config();
mongoose.connect(process.env.MONOGO_URI,{  useNewUrlParser: true,
useUnifiedTopology: true})
.then((done)=>{
    console.log('connected..')
})
.catch((e)=>{
    console.log(e);
})

const mongooseSchema = new mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    filetype:{
        type:String,
        required:true
    },
    filepath:{
        type:String,
        required:true
    },
    filesize:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
})

const mongooseModel = new mongoose.model('Useruploads',mongooseSchema)
module.exports = mongooseModel;
