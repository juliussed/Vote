import React, { useContext } from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { DarkModeContext } from '../../contextApi/Darkmode'
import Footer from '../footer/Footer'

export default function Layout() {
  const {darkMode} = useContext(DarkModeContext)

  return (
    <div>
      <div className={`theme-${darkMode ? "dark":"light"}`}>
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>  
    </div>
  )
}
