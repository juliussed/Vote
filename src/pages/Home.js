import React, {useState } from 'react'
// import './home.css'
import './home.scss'
import {useQuery} from 'react-query'
import { makeRequest } from '../axios/Axio'
import { Link } from 'react-router-dom'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TechSupportPopups from '../components/popups/TechsupportPopups'
import Phone from '@mui/icons-material/PhoneOutlined'
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';

export default function Home() {
  const [contestants,setContestants]=useState([])

  const [search,setSerach]=useState("")

  const {isLoading,error,data} = useQuery(["votes"],()=>
      makeRequest.get("/data").then((res)=>{
        return setContestants(res.data);
      })
  );

  const [tsuppotpop,setTsupportpop] =useState(false)


  return (
    <div className="maincontainer">
      <div className='Home' >
        <div className='banner'>
          <h1>KIDZ DANCE SHOW</h1>
        </div>
        <div className='home_inner'>
          <div className="home_input">
            <div id='search_icon'><SearchOutlinedIcon /></div>
            <input type='text' placeholder='Search by name or code' onChange={(e)=>setSerach(e.target.value)}/>
          </div>
          <div className='home_frame'>
            {isLoading? "Loading": contestants.filter((contestant,index)=>{
              if(search===""){
                return contestant
              }
              else if(contestant.name.toLowerCase().includes(search.toLowerCase())){
                return contestant
              }
              else if(contestant.code.toLowerCase().includes(search.toLowerCase())){
                return contestant
              }
            })
            .map((contestant,index)=>(
              <div id='home_frame' key={index}>
                <span>{contestant.code}</span>
                <div id='homeimage_frame'>
                  <img src={`http://localhost:4000/images/`+ contestant.image} alt="" />
                  <h3 id='votes'>{contestant.votes} <span>votes</span></h3>
                </div>
                <h3>{contestant.name}</h3>
                <Link id='link' to={`/paymentoption/${contestant.id}`}><button> Click to VOTE </button></Link>
              </div>      
            ))}
          </div>
        </div>
        <button className='contact_us' onClick={()=>setTsupportpop(true)} >
          <SupportAgentOutlinedIcon />
        </button>
      </div>
      <div>
        <TechSupportPopups trigger={tsuppotpop} setTrigger={setTsupportpop}></TechSupportPopups>
      </div>
    </div>
  )
}
