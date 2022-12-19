const express = require('express')
require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config({path: './.env'})
const multer = require('multer');
const mongooseModel = require('./database')
const jwt = require('jsonwebtoken');
const bycrpt = require('bcryptjs')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const auth = require('./middle/auth')
const usermodel = require('../server/database2');
const corsOptions = {
    origin:true,
    credentials:true
};
app.use(cors());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/pictures',express.static(path.join(__dirname,'pictures')));

const PORT = process.env.PORT || 4000
app.listen(PORT);
console.log(`I'm listening at PORT ${PORT}`)

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'pictures');
    },
    filename:(req,file,cb)=>{
        cb(null, new Date().toISOString().replace(/:/g, '-')+ '-'+ file.originalname)
    }
})

const filefilter = (req,file,cb)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg'|| file.mimetype==='image/jpeg'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const upload = multer({
    storage:storage,
    fileFilter:filefilter
})
const fileSizeFormatter =(bytes,decimal) =>{
    if(bytes===0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ["Bytes","KB","MB","GB","TB","PB","EB","YB","ZB"];
    const index = Math.floor(Math.log(bytes)/Math.log(1000));
    return parseFloat((bytes/Math.pow(1000,index)).toFixed(dm))+ ' ' +sizes[index];
}


app.post('/postit',upload.single('file'),async(req,res)=>{
    try{
        const file = new mongooseModel({
            title:req.body.title,
            filename:req.file.originalname,
            filepath:req.file.path,
            // filesize:req.file.size,
            filetype:req.file.mimetype,
            filesize:fileSizeFormatter(req.file.size,2) //0.00
        });
        await file.save()
        console.log(file);
        res.status(201).json(file)
            }catch(e){
        res.status(400).send(e)
        console.log(e);
            }
          
        })

        app.get('/getit',async(req,res)=>{
            try{
                const pic = await mongooseModel.find({});
                res.status(201).send(pic)
            }catch(e){
                res.status(400).send(e)
                throw e
            }
        })

        app.post('/signup',async(req,res)=>{
            try{
                const {name,email,password,confirmpassword} = req.body;
                if(!name || !email || !password || !confirmpassword){
                    res.status(401).json({erro:"Plz fill it correctly!!"})
                }else{
                const userExists = await usermodel.findOne({email:email});
                if(userExists){
                    res.status(401).json({erro:"user already exists"})
                }else if(password!==confirmpassword){
                    res.status(402).json({erro:"Plz fill it correctly!!"})
                }else{
                    const dataAdded = new usermodel({name,email,password,confirmpassword});
                    const saveData = await dataAdded.save();
                    console.log(saveData);
                    res.status(201).json(`${name} successfully added`)
                }}
            }catch(e){
                res.status(401).send(`Invalid request ${e}`)
                console.log(e);
            }
        })

        app.delete('/dalll',async(req,res)=>{
            try{
                const del = await mongooseModel.deleteMany({});
                console.log(del);
                res.status(201).json({message:"deleted successfully!"})
            }catch(e){
                console.log(e);
                res.status(401).json(e);
            }
        })

        app.post('/login',async(req,res)=>{
            try{
                const {email,password} = req.body;
                if(!email || !password){
                     res.status(401).json({error:"error!"})
                }else{
                const userlogin = await usermodel.findOne({email:email})
                if(!userlogin){
                     res.status(401).json({error:"error!"})
                }else{
                const isMatch = await bycrpt.compare(password,userlogin.password);
                const token = await userlogin.generateAuthToken();
                console.log(token);

                res.cookie("jwttoken",token,{
                    expires:new Date(Date.now()+ 25892000000),
                    HttpOnly:true
                });

                console.log(`${req.cookies.jwttoken}`);

                if(!isMatch){
                    res.status(401).send({error:"error"})
                }else{
                    res.status(201).json({message:"Signin success buddy!!!"})
                }}

            }}catch(e){
                console.log(e);

            }
        })

        // about us page
        app.get('/homess',auth,(req,res)=>{
            res.send(req.check)
        })

        //conatct page

        app.get('/contact',auth,(req,res)=>{
            res.send(req.check)
        })

        app.get('/logout',auth,(req,res)=>{
            res.clearCookie('jwttoken',{path:'/'});
            res.status(201).send('user logout')
        })

        
        app.post('/sent',auth,async(req,res)=>{
           try{
            const {name,email,message} = req.body;
            if(!name || !email ||!message){
                console.log(`${req.body} is blank.`);
                return res.status(401).json({error:"error"})
            }
            const userif = await usermodel.findOne({_id:req.userid});
            if(userif){
                const umessage = await userif.addMessage(name,email,message)
                await userif.save();
                console.log(userif);
                res.status(201).json({message:"added.."})
            }else{
                console.log("error")
            }
            }catch(e){
            console.log(e);
           }
        })
    
          
        app.post('/postcomm',auth,async(req,res)=>{
            try{
             const {comment} = req.body;
             if(!comment){
                 console.log(`${req.body} is blank.`);
                 return res.status(401).json({error:"error"})
             }
             const findId = await usermodel.findOne({_id:req.userid});
             if(findId){
                 const comm = await findId.addComments(comment)
                 await findId.save();
                 console.log(findId);
                 res.status(201).json({message:"added.."})
             }else{
                 console.log("error")
             }
             }catch(e){
             console.log(e);
            }
         })
     app.delete('/ddd',async(req,res)=>{
        const dele = await usermodel.deleteMany({});
        res.status(201).json(dele);
     })


    app.get('/search',async(req,res)=>{
        const myData = await usermodel.find(req.query);
       console.log(myData);
        console.log(req.query)
       res.status(201).json({myData});
    })



////production stage
if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,"./client/build")));
   app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./client','build','index.html'));
   })
}


//lets see    