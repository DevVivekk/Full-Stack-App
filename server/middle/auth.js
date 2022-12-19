const jwt = require('jsonwebtoken')
const usermodel = require('../database2')
const auth = async(req,res,next)=>{
    try{
        const token = req.cookies.jwttoken;
        const verify= jwt.verify(token,process.env.SECRET_KEY)
        const check = await usermodel.findOne({_id:verify._id,"tokens.token":token})
        if(!check){
            throw new Error('User NA!')
        }else{
            req.token = token;
            req.check=check;
            req.userid = check._id;
            next();        
        }
    }catch(e){
        console.log(e);
        res.status(401).send('Unauthorised!');
    }
}
module.exports = auth;