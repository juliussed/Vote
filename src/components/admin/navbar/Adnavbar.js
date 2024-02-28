import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import './adnavbar.scss';
import Cookies from 'js-cookie';
import axios from 'axios';
import IMG from '../../../images/Juju-Logo.png'

export default function Navbar() {

  const navigate = useNavigate();

  const [navbar,setNavbar] = useState(false)

  const chageNavbar = ()=>{
    if(window.scrollY >= 200){
      setNavbar(true)
    }else setNavbar(false)
  }

  window.addEventListener('scroll',chageNavbar)





  const Logout = async ()=>{
    // Clear the user from local-storage
    localStorage.removeItem('user');

    try{
      await axios.post("http://localhost:4000/logout");

      // Clear the access token from cookies
      Cookies.remove('accessToken');

    }catch (err){
      console.error(err);
    }
    
    navigate("/login") 
  };



  return (
    <div className={navbar ? 'navbar active' : 'navbar'}>
      <div className="inner">
        <div id='inner_left'>
          <img src={IMG} alt="logo" />
          <h3>Voting made easy for you!</h3>
          <div className="nav_icons">
            <Link id='link' to="/adminchart"><BarChartOutlinedIcon className='icons'/></Link>
            <span>Chart</span>
          </div>
          <div className="nav_icons">
            <Link id='link' to="/transactions"><ReceiptOutlinedIcon className='icons'/></Link>
            <span>Transaction Records</span>
          </div>
        </div>
        <div id='inner_right'>
          <div className="nav_icons">
            <Link id='link' to="/admin"><HomeOutlinedIcon className='icons'/></Link>
            <span>Home</span>
          </div>
          <h3 onClick={Logout}>Logout</h3>
        </div>
      </div>  
    </div>
  )
};
