
import './style.scss'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {useMutation,useQueryClient} from 'react-query'
import { makeRequest } from '../axios/Axio'

export default function Update() {
  // setting up useState to recieve userInputs
  const [contestants,setContestants]= useState({
    name:'',
    code:""
  })
  
  // handling change with usersinput
  const handleChange =(e)=>{
    setContestants((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  // initializing UseNavigate and UseLocation
  const navigate = useNavigate()
  const location = useLocation()

  // getting users id from the pathname using the Uselocation//
  const contestantId = location.pathname.split("/")[2]

  // using ReactQuery to reload the page when contestants are updated
  const queryClient = useQueryClient()
  const mutation = useMutation((id)=>{
    return makeRequest.put("/update/"+ contestantId,contestants)
    }, 
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["info"])
      },
    }
  )

  // settingUp image Updating
    // setTing up useState to recieve image file//
  const [file,setFile]=useState()
  const handleFile=(e)=>{
    setFile(e.target.files[0])
  }
   // using ReactQuery to reload the page when Images are updated
  const queryClientImage = useQueryClient()
  const formdata = new FormData();
  formdata.append('photo',file) 
  const mutationImage = useMutation((id)=>{
    return makeRequest.put("/updateimage/"+ contestantId,formdata)
    }, 
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClientImage.invalidateQueries(["info"])
      },
    }
  )
  const [errors,setErrors]=useState({})
  // creating the button that passes both Updated Input and image uploading function into action
  const handleClick = async (e)=>{
    e.preventDefault()
    const validationErrors = {}
    if(!contestants.name.trim()){
      validationErrors.name ="*Enter Contestant Name Again"
    }
    if(!contestants.code.trim()){
      validationErrors.code ="*Enter Contestant Code"
    }
    setErrors(validationErrors)

    if(Object.keys(validationErrors).length === 0){
      mutation.mutate(contestantId,contestants)
      mutationImage.mutate(contestantId,formdata)
      navigate("/admin")
    }  
  } 

  return (
    <div className='add_page'>
      <div className="container" >
        <h3>Add New Contestant</h3>
        <input className="input" type="text" placeholder={'Enter Contestants name'} onChange={handleChange} name='name'/>
        {errors.name && <span>{errors.name}</span>}
        <input className="input" type="text" placeholder='Enter Special Code' onChange={handleChange} name='code'/>
        {errors.code && <span>{errors.code}</span>}
        <input type="file" onChange={handleFile} />
        <button  onClick={handleClick}>Click to Update</button>
      </div>  
    </div>
  )
}
