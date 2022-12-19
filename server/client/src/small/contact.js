import React, { useEffect, useState } from 'react'
import Mans from '../images/mans.jpg'
function Contactus() {

  const[contact,setContact] = useState({name:"",email:"",message:""});
  const callcontact = async()=>{
    try{
        const res = await fetch('/contact',{
            method:"GET",
            credentials:'include',
            headers:{
              "Accept":"application/json",
              "Content-Type":"application/json"
            },
        });
        const data = await res.json();
        setContact({...contact,name:data.name,email:data.email});
        if(!data){
            const error = new Error(res.error);
            throw error;
        }
    }catch(e){
        console.log(e);
    }
}
useEffect(()=>{
    callcontact();
},[])

const handlechange = async(e)=>{

const  name = e.target.name;
const value = e.target.value;
  setContact({...contact,[name]:value})
}
const submitContact = async(e)=>{
  e.preventDefault();
  const {name,email,message} = contact;
  const response = await fetch('/sent',{
    method:'POST',
    credentials: 'include',
    headers:{
      "Accept":"application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify({name,email,message})
  })
//const data = await res.json();
  if(response.status===201){
    window.alert('sent!')
    setContact({...contact,message:""})
  }else{
    window.alert('Server errro..')
  }
  //console.log(contact);
}
  return (
    <div className='contact'>
    <div className='main-1'>
    <div className='sub'>
    <h1 style={{"fontSize":"4rem","fontFamily":"'Martian Mono', monospace","marginTop":"3rem"}}>Conatct Us</h1>
    <h1 style={{"fontStyle":"italic","fontSize":"2rem"}}>Hi, {contact.name}👋! You can drop your message below! </h1>
    <h2 style={{"fontFamily":"monospace","fontSize":"2rem"}}>Your email address : {contact.email}</h2>
    <div> 
    <form onSubmit={submitContact} method="POST">
    <label style={{"fontFamily":"monospace","fontSize":"2rem"}}>Name :</label>
    <input  id='contact'  name='name' style={{"marginLeft":"3rem","width":"15rem","height":"3rem","textAlign":"center"}} value={contact.name} onChange={handlechange}/><br /><br />
    <label style={{"fontFamily":"monospace","fontSize":"2rem"}}>Email address :</label>
    <input id='contact' style={{"marginLeft":"3rem","width":"15rem","height":"3rem","textAlign":"center"}} name='email' value={contact.email} onChange={handlechange} /><br /><br />
    <input  id='contact'  name='message' value={contact.message} onChange={handlechange} type='text' style={{"width":"30rem","height":"7rem"}} placeholder='Enter your message' /><br/>
    <div style={{"position":"relative"}}>
    <button style={{"marginTop":"3rem","width":"14rem","height":"4rem","color":"white","backgroundColor":"pink","border":"1.7px solid white","fontWeight":"600","cursor":"pointer"}}>Submit</button><br />
    <button type='submit' style={{"position":"absolute","top":"4rem","left":"1rem","width":"14rem","height":"4rem","color":"white","backgroundColor":"darkgreen","fontWeight":"600","cursor":"pointer","marginBottom":"0rem"}}>Submit</button>
    </div>
    </form>
    </div>
    </div>
    </div>
    <div className='main-1'>
    <div>
      <img src={Mans} alt='img' style={{"width":"50rem","height":"40rem"}} />
    </div>
    </div>
        
    </div>
  )
}

export default Contactus
