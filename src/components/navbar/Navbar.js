import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import {DarkModeContext} from '../../contextApi/Darkmode';
import './navbar.scss';
import '../../pages/home.scss';
import TechSupportPopups from '../popups/TechsupportPopups';
import IMG from '../../images/Juju-Logo.png';

export default function Navbar() {
  const {toggle,darkMode} =useContext(DarkModeContext);
  const [tsuppotpop,setTsupportpop] =useState(false)

  const [navbar,setNavbar] = useState(false)

  const chageNavbar = ()=>{
    if(window.scrollY >= 100){
      setNavbar(true)
    }else setNavbar(false)
  }

  window.addEventListener('scroll',chageNavbar)
  return (
    <div className={navbar ? 'navbar active' : 'navbar'}>
      <div className="inner">
        <div id='inner_left'>
          <img src={IMG} alt="logo" />
          <h3>Voting made easy for you!</h3>
        </div>
        <div className="center">
          
        </div>
        <div id='inner_right'>
          <div id='home-icon' className="nav_icons">
            <Link id='link' to="/"><HomeOutlinedIcon className='icons'/></Link>
            <span>Home</span>
          </div>
          <div className="nav_icons">
            <Link to="/chart"><BarChartOutlinedIcon className='icons'/></Link>
            <span>Chart</span>
          </div>
          <div className="nav_icons">
            <Link>{darkMode ? <LightModeOutlinedIcon className='icons' onClick={toggle}/> : <DarkModeOutlinedIcon className='icons' onClick={toggle}/> }</Link>
            {darkMode ? <span>Lightmode</span> : <span>Darkmode</span>}
          </div>
          
          <div className="nav_icons">
            <Link><SupportAgentOutlinedIcon className='icons' onClick={()=>setTsupportpop(true)}/> </Link>
            <span>Agent</span>
          </div>
        </div>
      </div>

      <div className='techsupport'>
      <TechSupportPopups trigger ={tsuppotpop} setTrigger={setTsupportpop}></TechSupportPopups>
      </div>
    </div>
    
  )
}
