import React, { useState } from 'react'
import './popups.scss'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import Pic from '../../images/img.jpg'

function TechSupportPopups(props) {
  // const [trigger,setTrigger] = useState(false)
  
  return  (props.trigger) ? (
    <div className='tech_main'>
      <div className='tech_inner'>
        <button onClick={()=>props.setTrigger(false)}><CloseOutlinedIcon/></button>
        <div className="ts_container"></div>
        <div className="subcontainer">
          <div className="call">
            <span>Leave us a message</span> 
          </div>
          <div className="welcome_message">
            <p>Meet Mr.tech</p>
            <div className="message">
              <img src={Pic} alt=""/>
              <h6>‣‣‣</h6>
              <p>Typically answers within a day</p>
            </div>
          </div>
          <div className="start_conv">
            <a href="https://wa.me/233244784876"><span>Start Conversation <h2><ForwardToInboxOutlinedIcon className='mail'/></h2></span> </a>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  ) : "";
}

export default TechSupportPopups