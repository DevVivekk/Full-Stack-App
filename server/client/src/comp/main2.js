import React, { useState } from 'react'
import Close from '../images/close.png'
import {useNavigate} from 'react-router-dom'
function Main2(props) {
  const [user,setUser] = useState({email:"",password:""})
  const navigate = useNavigate();
  function handleChange(e){
    let name,value;
    name = e.target.name;
    value = e.target.value;
    setUser({...user,[name]:value})
  }
  const submitData = async(e) => {
    e.preventDefault();
    const {email,password}  = user;
    const res = await fetch('/login',{
      method:"POST",
         credentials: 'include',
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password}),
    });
    if(res.status===201){
      window.alert('Success..')
      navigate('/home');
    }
    else{
      window.alert('Invalid Credentials..')
    }
  }
  return (


    <div className='home-2'>
    <div className='sign-in' style={{"position":"relative"}}>
    <img onClick={()=>props.popup()} style={{"width":"4rem","height":"4rem","borderRadius":"50%","left":"33rem","top":"2rem","cursor":"pointer","position":"absolute"}} src={Close} alt='img' />
            <form method='POST'>
            <input onChange={handleChange} name='email' value={user.email} type='text' placeholder='Email' style={{"marginBottom":"2rem","width":"25rem","height":"2rem","padding":"2rem","borderRadius":"1rem","fontSize":"2rem","fontWeight":"500"}} /><br />
            <input autoComplete='on' onChange={handleChange}   name='password' type='password' value={user.password} placeholder='Password' style={{"marginBottom":"2rem","width":"25rem","height":"2rem","padding":"2rem","borderRadius":"1rem","fontSize":"2rem","fontWeight":"500"}} /><br />
            <button type='submit' onClick={submitData} className='home-button' style={{"width":"14rem","height":"4rem","borderRadius":"3rem","color":"white","backgroundColor":"green","border":"1.7px solid white","fontWeight":"600","cursor":"pointer"}}>SIGN IN</button>
        </form>
        </div>
    </div>
  )
}

export default Main2