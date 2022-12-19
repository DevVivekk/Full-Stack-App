import React, { useEffect, useState } from 'react'
import Tab from '../images/tab.png'
import Home from '../images/homee.png'
import { useNavigate } from 'react-router-dom'
import Navtab from '../small/navtab'
import Search from '../images/sbar.png'


function Navbar() {
  const navigate  = useNavigate();
  const [tab,setTab] = useState(false);
  const [person,setPerson] = useState('');
  const[search,setSearch] = useState('');
  const [info,setInfo] = useState([]);

const handleChnage = (e)=>{
  setSearch(e.target.value);

}
const searchAPI = async(title)=>{
  console.log(`i called ${title}`)
  const response = await fetch(`/search?name=${title}`)
  const data = await response.json();
  setInfo(data);
} 


  const homeClick = ()=>{
    navigate('/home')
  }
  const callabout = async()=>{
    try{
        const res = await fetch('/homess',{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
        const data = await res.json();
        setPerson(data);
        if(res.status!==200){
            const error = new Error(res.error);
            throw error;
        }
    }catch(e){
        navigate('/')
        console.log(e);
    }
}
useEffect(()=>{
    callabout();
},[])
  return (
    <div className='navbar' style={{"zIndex":"2"}}>
   <img src={Home} onClick={homeClick}  style={{"marginTop":"1.8rem","width":"4rem","height":"4rem"}} alt='home' />
   <div style={{"position":"relative"}}>
    <input className='nav' name='search' type='search'  value={search} onChange={handleChnage} id='search' style={{"fontSize":"1.3rem","backgroundColor":"white","width":"20rem","height":"3rem","color":"black"}} placeholder='Search' />
    <img style={{"position":"absolute","width":"3rem","height":"3rem","marginTop":"2.3rem","marginLeft":"1rem"}} onClick={()=>searchAPI(search)} src={Search} alt='img' />
    </div>
    <div style={{"display":"flex","flexDirection":"row"}}>
    <li  style={{"fontSize":"2rem","fontFamily":"monospace","width":"26rem","textAlign":"right","marginLeft":"4rem"}}  className='nav'>Welcome, {person.name}</li>
    <span><img style={{"marginTop":"2rem","marginLeft":"1.5rem","width":"3rem","height":"3rem","position":"relative"}} onClick={()=>(setTab(!tab))} src={Tab} alt='tab' />
    {
        tab?<Navtab />:null
    }
    </span>
    </div>
    </div>
  )
}

export default Navbar