import React, { useState } from 'react'
import {useQuery} from 'react-query'
import { Link, useLocation } from 'react-router-dom'
import { makeRequest } from '../../axios/Axio'
import './payment.scss'

export default function PaymentOptionpage () {
  const [contestant,setContestant]=useState([])

  // initializing UseNavigate and UseLocation
  const location = useLocation()

  // getting users id from the pathname using the Uselocation//
  const contestantId = location.pathname.split("/")[2]

  const {isLoading,error,data} = useQuery(["votes"],()=>
      makeRequest.get("/contestantinfo/"+contestantId).then((res)=>{
        return setContestant(res.data);
      })
  );

  return (
    <div className='main_container'>
        <p>Are you sure You want to vote for </p>
        {isLoading? "Loading": contestant.map((contestante,index)=>(
              <div id='frame' key={index}>
                {/* <h3 id='votes'>
                  {contestante.votes} Votes
                </h3> */}
                <div id='image_frame'>
                  <img src={`http://localhost:4000/images/`+ contestante.image} alt="" />
                </div>
                <h3>{contestante.name}</h3>
                <span>{contestante.code}</span>
                <div className='click-to-vote'>
                  <Link to='/'><button className='button'> NO</button></Link> 
                  <Link to={`/bank/${contestante.id}`}><button className='button'> YES </button></Link> 
                </div>
              </div>        
            ))}
    </div>
  )
}
