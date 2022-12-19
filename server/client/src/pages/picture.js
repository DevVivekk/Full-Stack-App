import React, { useEffect, useState } from 'react'
import {singleFileUpload} from '../pages/apii'
import{getSingle} from '../pages/apii'
import Com from '../images/com.jpg'
import Comments from './comments'
function Pictureupload() {
    const portfolio = ()=>{
        window.open('https://viveksweb.netlify.app')
    }
    const [comment,setComment] = useState(false);
const [single,setSingle] = useState('');
const [one,setOne] = useState([])
const [title,setTitle] = useState('')

const getSinglelist= async()=>{
    try{
        const fileupload = await getSingle();
        setOne(fileupload);
    }catch(e){
        console.log(e);
    }
}

useEffect(()=>{
    getSinglelist()
},[])

const singleFile=(e)=>{
    setSingle(e.target.files[0])
}
const uploadSingle= async()=>{
const formData = new FormData();
formData.append('file',single);
formData.append('title',title);
await singleFileUpload(formData);
getSinglelist();
console.log(single);
console.log(title);
}

  return (
    <div style={{"display":"flex","flexDirection":"row","justifyContent":"space-between","flexWrap":"wrap","width":"100vw","height":"100vh","minWidth":"63rem"}}>
    <div  className='home-comp'>
        <div className='picture' style={{"display":"flex","marginTop":"0rem","flexDirection":"column","alignItems":"center"}}>
        <input placeholder='Let the world know...' style={{"marginTop":"1rem","marginBottom":"1rem","width":"30rem","height":"2rem","padding":"2rem","backgroundColor":"white","outline":" 2px solid red","borderRadius":"1rem","fontSize":"2rem","fontWeight":"500"}} type='text' className='form-control' name='title' onChange={(e)=>setTitle(e.target.value)} />
        <input type='file' style={{"backgroundColor":"white"}} name='file' onChange={(e)=>singleFile(e)} /><br /><br />
        <button type='submit'style={{"width":"10rem","marginBottom":"1rem","height":"3rem","borderRadius":"3rem","color":"white","backgroundColor":"purple","border":"1.7px solid white","fontWeight":"600","cursor":"pointer"}} onClick={()=>uploadSingle()}>Post</button>
        </div>

        <div className='picture-1'>
        {
            one.length===0?<h1>Loading..</h1>:
        
        
            one.concat().reverse().map((file,index)=>
            <>
          <div key={index} className='divs' style={{"position":"relative"}}>
                <img src={`https://walkytalky.onrender.com/${file.filepath}`} alt="img" style={{"height":"30rem","width":"auto","marginTop":"2rem"}} /><br />
                <div style={{"display":"flex","flexDirection":"row","justiyContent":"space-between"}}>
                <h2 style={{"fontStyle":"italic","textAlign":"start","marginLeft":"2rem","width":"25rem","overflow":"auto","height":"5rem"}}>✌ {file.title}</h2>
                <img onClick={()=>setComment(!comment)}  style={{"zIndex":"1","width":"3rem","height":"3rem","marginRight":"0rem","position":"relative"}} src={Com} alt='comment' />
                {
                    comment?<Comments />:null
                }
                </div>
                </div>
            </>
            
            )
        }
        </div>
    </div>

    {/* //Second div main */}
    <div className='picture-1' style={{"display":"flex","justifyContent":"center","backgroundColor":"whitesmoke"}}>
    <h1 style={{"fontFamily":"'Lato', sans-serif","marginTop":"-10rem","fontSize":"3.5rem","width":"45rem","wordSpacing":"0.7rem","lineHeight":"4.5rem"}}>Here you can share your pictures and post anonymous comments.👾</h1><br /><br />
    <p style={{"fontSize":"2rem","fontFamily":"monospace","marginTop":"3rem"}}>For My Portfolio app visit here 👇</p><br /><br />
    <div style={{"position":"relative","right":"5rem"}}>
    <button style={{"marginTop":"3rem","width":"14rem","height":"4rem","color":"white","backgroundColor":"aqua","border":"1.7px solid white","fontWeight":"600","cursor":"pointer"}}>Submit</button><br />
    <button onClick={portfolio} style={{"position":"absolute","top":"4rem","left":"1.5rem","width":"14rem","height":"4rem","color":"white","backgroundColor":"black","fontWeight":"600","cursor":"pointer","marginBottom":"3rem"}}>Visit Here</button>
    </div>
    </div>
    </div>
  )
}

export default Pictureupload