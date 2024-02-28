import React, { useEffect, useState } from 'react'
import './admin.scss'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { makeRequest } from '../axios/Axio'



export default function Admin() {
    const [contestants,setContestants]=useState([])

    const {isLoading,error,data} = useQuery(["info"],()=>
        makeRequest.get("/data").then((res)=>{
            return setContestants(res.data);
        })
    );

    const queryClientDelete = useQueryClient()    

    const mutationDelete = useMutation((id)=>{
        return makeRequest.delete("http://localhost:4000/delete/"+id)
        }, 
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClientDelete.invalidateQueries(["info"])
          },
        }
      )    

    const handleDelete = async (id)=>{
        mutationDelete.mutate(id)
    }

  return (
    <div className='admin' >
        <div className='inner'>
            <h2>Contestants Page</h2>
            <Link id='link' to="/add"><button>ADD NEW +</button></Link>
            <div className='main_frame'>
              {isLoading? "Loading":contestants.map((contestant,index)=>(
                <div id='frame' key={index}>
                    <span id='votes'>{contestant.votes} Votes</span>
                    <div id='image_frame'>
                        <img src={`http://localhost:4000/images/`+ contestant.image} alt="" />
                    </div>
                    <h3>{contestant.name}</h3>
                    <span>{contestant.code}</span>
                    <div className='buttons'>
                        <Link to={`/update/${contestant.id}`}><button id='update'>Update</button></Link>
                        <button id='delete' onClick={()=>handleDelete(contestant.id)}>Delete</button>
                    </div>
                </div>     
              ))}
            </div>
        </div>
        <a href="http://localhost:3000/"><button>Go to home page</button></a>
    </div>
  )
}
