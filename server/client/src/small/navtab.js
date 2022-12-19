
import { NavLink } from 'react-router-dom'
//import { BrowserRouter } from 'react-router-dom'

function Navtab() {
  return (
    <div className='Navtab' style={{"right":"1.5rem","display":"flex","flexDirection":"column","width":"20rem","height":"25rem","position":"absolute","top":"5","alignItems":"center"}}>

    <NavLink to='/contactus' style={{"marginTop":"2rem","color":"black","fontSize":"2rem","textDecoration":"none"}}>Contact</NavLink>
    <NavLink to='/logout' style={{"marginTop":"2rem","color":"black","fontSize":"2rem","textDecoration":"none"}}>Logout</NavLink>
  
    </div>
  )
}

export default Navtab