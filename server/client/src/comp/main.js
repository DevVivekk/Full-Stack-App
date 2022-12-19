import React, { useState } from 'react'
import Fa from '../images/fa.jpg'
import Ia from '../images/insta.jpg'
import Ga from '../images/go.png'
import Main2 from './main2';
import Typewriter from 'typewriter-effect';
function Main() {
  const [users,setUsers] = useState({name:"",email:"",password:"",confirmpassword:""})
  const [see,setSee] = useState(false);
  const popup = ()=>{
    setSee(!see)
  }
  function handleChange(e){
    let name,value;
    name= e.target.name;
    value= e.target.value;
    setUsers({...users,[name]:value});
  }
    const postApi = async(e)=>{
      e.preventDefault();
      const {name,email,password,confirmpassword}  = users;
      const res = await fetch('/signup',{
        method:"POST",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify({name,email,password,confirmpassword})
      });
       if(res.status===201){
        window.alert(`Thanks ${name} for signing up..`)
        setUsers({...users,name:"",email:"",password:"",confirmpassword:""})
      }else if(res.status===402){
        window.alert('Password mismatch error.')
      }
      else{
        window.alert('Error: Input fields cant be left blank and emails are unique!!')
      }
    }
  return (
    <div className='home'>
    <div className='box-1 box' style={{"display":"flex","flexDirection":"column","alignItems":"center"}}>
    <h1  style={{"textAlign":"center","marginLeft":"2rem","marginTop":"20rem","fontSize":"4.5rem","color":"white","fontFamily":"Lato","width":"55rem"}}><Typewriter onInit={(typewriter)=>{
      typewriter.typeString('Welcome To Walky Talky!').pauseFor(1000).deleteAll().typeString("Share pictures, memes and many more..").pauseFor(2000).deleteAll().typeString("SignUp Now!! 😃").start();
    }} /></h1><br /><br /><br />
        <p style={{"fontSize":"2rem","fontStyle":"oblique"}}>To start posting please login with your personal info</p><br /><br /><br /><br />
        <button onClick={()=>popup()} className='home-button' style={{"width":"14rem","height":"4rem","borderRadius":"3rem","color":"white","backgroundColor":"coral","border":"1.7px solid white","fontWeight":"600","cursor":"pointer"}}>SIGN IN</button>
    </div>
    <div className='box' style={{"display":"flex","flexDirection":"column","alignItems":"center"}}>
        <h1 style={{"fontSize":"3rem","marginTop":"3rem","fontFamily":"'Lato', sans-serif"}}>Create Your New Account</h1><br /><br />
        <div style={{"display":"flex","flexDirection":"row","justifyContent":"space-around","width":"20rem"}}>
            <img style={{"width":"4rem","height":"4rem","borderRadius":"50%"}} src={Fa} alt='img' />
            <img style={{"width":"4rem","height":"4rem","borderRadius":"50%"}} src={Ia} alt='img' />
            <img style={{"width":"4rem","height":"4rem","borderRadius":"50%"}} src={Ga} alt='img' />
        </div><br /><br />
        <p style={{"fontSize":"2rem","fontStyle":"oblique"}}>or use your email address for registration</p>
        <div className='signin' style={{"marginTop":"5rem"}}>
        <form method='POST'>
            <input type='text' value={users.name} onChange={handleChange} name="name" placeholder='Full Name' style={{"marginBottom":"2rem","width":"25rem","height":"2rem","padding":"2rem","borderRadius":"1rem","fontSize":"2rem","fontWeight":"500"}} /><br />
            <input type='text' value={users.email} onChange={handleChange} name="email" placeholder='Email' style={{"marginBottom":"2rem","width":"25rem","height":"2rem","padding":"2rem","borderRadius":"1rem","fontSize":"2rem","fontWeight":"500"}} /><br />
            <input type='password' autoComplete='on' value={users.password} onChange={handleChange} name="password"  placeholder='Password' style={{"marginBottom":"2rem","width":"25rem","height":"2rem","padding":"2rem","borderRadius":"1rem","fontSize":"2rem","fontWeight":"500"}} /><br />
            <input type='password' autoComplete='on' value={users.confirmpassword} onChange={handleChange} name="confirmpassword"  placeholder='Confirm Password' style={{"marginBottom":"2rem","width":"25rem","height":"2rem","padding":"2rem","borderRadius":"1rem","fontSize":"2rem","fontWeight":"500"}} /><br /><br />
            <button onClick={postApi} style={{"width":"14rem","height":"4rem","color":"white","backgroundColor":"darkgreen","border":"1.7px solid white","fontWeight":"600","cursor":"pointer"}}>SIGN UP</button>
        </form>
        </div>
    </div>
    {
      see?<Main2 popup={popup} />:null
    }
    </div>
  )
}

export default Main