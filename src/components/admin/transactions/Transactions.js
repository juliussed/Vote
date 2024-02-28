import React, { useState } from 'react'
import './transaction.scss'
import { makeRequest } from '../../../axios/Axio';
import { useQuery } from 'react-query';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


export default function Transactions (){

  const [voters,setVoters] = useState([])
  const [search,setSerach]=useState("")

  const [sumvotes,setSumvotes]=useState([])

  const {isLoading,error,data} = useQuery(["voters_info"],()=>
    makeRequest.get("/getvotersdata").then((res)=>{
    return setVoters(res.data);
    })
  );

  const {loading,err,dat}= useQuery(["sum"],()=>
    makeRequest.get("/sumtotal").then((res)=>{
    return setSumvotes(res.data)
    })
  )
  console.log(sumvotes);
  
  

  

  return (
    <div className='main'>
        <div className="input">
            <SearchOutlinedIcon/>
            <input type='text' placeholder='Search by email or date' onChange={(e)=>setSerach(e.target.value)}/>
        </div>
        <div id='frame'>
            <div className="email">
                <h3>Email</h3>
            </div>
            <div className="email">
                <h3>Phone</h3>
            </div>
            <div className="email">
                <h3>Receipt</h3>
            </div>
            <div className="email">
                <h3>Amount</h3>
            </div>
            <div className="email">
                <h3>contestant ID</h3>          
            </div> 
            <div className="email">
                <h3>Date&Time</h3>
            </div>
        </div>   
        
        <div className='main_frame'>
            {isLoading? "Loading": voters.filter((voter,index)=>{
                if(search===""){
                    return voter
                }
                else if(voter.time.toLowerCase().includes(search.toLowerCase())){
                    return voter
                }
                else if(voter.email.toLowerCase().includes(search.toLowerCase())){
                    return voter
                }
                else if(voter.phone.toLowerCase().includes(search.toLowerCase())){
                    return voter
                }
                }).map((voter,index)=>(
                <div className='frame' key={index}>
                    <div className='colum'>
                        <div id='email'>
                            {voter.email}
                        </div>
                        <span>{voter.phone}</span>
                        <span>{voter.receipt}</span>
                        <span>{voter.amount +' .00' +'  gh'}</span>
                        <span>{voter.contestantId}</span>
                        <span>{voter.time}</span>
                    </div>
                </div> 
            ))}
        </div> 
        <div>
            <h2>total votes = {sumvotes}</h2>
        </div>
    </div>        
  )
}
