import React from 'react'
import Main from './main'
import Pictureupload from '../pages/picture'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './navbar'
import Contactus from '../small/contact'
import Logout from './logout'
function Header() {
  return (
    <>
        <BrowserRouter>
            <Routes>
            <Route path='/' element={[<Main />]} />
                <Route path='/home' element={[<Navbar />,<Pictureupload />]} />
                <Route path='/contactus' element={[<Navbar />,<Contactus />]} />
                <Route path='/logout' element={<Logout />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Header