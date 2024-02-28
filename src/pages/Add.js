import './style.scss'
import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import {useMutation,useQuery,useQueryClient} from 'react-query'
import { makeRequest } from '../axios/Axio'
import Uplaodimg from '../components/popups/Popup'
import Home from './Home'

export default function Update({onHandle,array}) {
  // seeting up useState to recieve userInputs
  const [contestants,setContestants]= useState({
    name:'',
    code:""
  })
  const [name,setName]=useState('')
  const [code,setCode]=useState('') 
  const [image,setImage] =useState('')

  const queryClient = useQueryClient()

  // setting up useState to recieve image file//
  const [file,setFile]=useState({})
  // const handleFile=(e)=>{
  //   setFile(e.target.files[0])
  // }

  // using ReactQuery to reload the page when Images are updated
  const formdata = new FormData();
  formdata.append('photo',file) 

  // retriving lastinserted Id from database 

  
  // handling change with usersinput

  // const handleChange =(e)=>{
  //   setContestants((prev)=>({...prev,[e.target.name]:e.target.value}))
  // }

  // initializing UseNavigate and UseLocation
  const navigate = useNavigate()

  
 

  // // using ReactQuery to reload the page when contestants are updated
  
  // const mutation = useMutation(()=>{
  //   return makeRequest.post("/add",NewArray)
  //   }, 
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["votes"])
  //     },
  //   }
  // );

  const [imgUploadPop,setImgUploadPop]=useState(false)

  // creating the button that passes both Updated Input and image uploading function into action
  const [errors,setErrors]=useState({})

  // const handleClick = async (e)=>{
  //   e.preventDefault()

   
  // }

  // const [lastid,setLastid]=useState()

  // const {data} = useQuery(["lasttid"],()=>
  //   makeRequest.get("/lastid").then((res)=>{
  //     return setLastid(res.data);
  //   })
  // );  

  // const imagemutation = useMutation(()=>{
  //   return makeRequest.put("/userimage/"+ lastid,formdata)
  //   }, 
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["lasttid"])
  //     },
  //   }
  // );

  // const Done = ()=>{
  //   imagemutation.mutate(lastid,formdata)
  //   navigate("/admin")
  //   // console.log(lastid);

  // }

  
  const handleClick =()=>{
    setImgUploadPop((open)=>!open)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()

    if (!name || !code) return;
    const c_id =crypto.randomUUID()
    const NewArray ={c_id,name,code,image}
    console.log(NewArray)
    onHandle(NewArray)
    
    
    // const validationErrors = {}
    // if(!contestants.name.trim()){
    //   validationErrors.name ="*Enter Contestant Name Again"
    // }

    // if(!contestants.code.trim()){
    //   validationErrors.code ="*Enter Contestant Code"
    // }

    // setErrors(validationErrors)

    // if(Object.keys(validationErrors).length === 0){
    //   mutation.mutate(contestants)
    //   setImgUploadPop(true)
    // }   
  }

  // using ReactQuery to reload the page when contestants are updated
  
  const mutation = useMutation(()=>{
    return makeRequest.post("/add",onHandle)
    }, 
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["votes"])
      },
    }
  );

  return (
    <>
    <form className='add_page' onSubmit={handleSubmit}>
      <div className="container" >
        <h3>Add New Contestant</h3>
        <input className="input" type="text" value={name} placeholder='Enter Contestants name' onChange={(e)=>setName(e.target.value)} name='name' autoComplete='on'/>
          {errors.name && <span>{errors.name}</span>}
        <input className="input" type="text" value={code} placeholder='Enter Special Code' onChange={(e)=>setCode(e.target.value)} name='code'/>
          {errors.code && <span>{errors.code}</span>}  
        <button id='enter' onClick={handleClick}>Submit</button>
      </div> 
      {imgUploadPop && (<div>
          <div className='up_main_container'>
            <div className="uploadInner">
              <h1>Upload Contestant Image</h1>
              <div>
                <input type="file" value={image} onChange={(e)=>
                  setImage(e.target.value)} />
              </div>
              <div className="imgContainer">
                <img src="" alt="" />
              </div>
              <button >Done</button>
            </div> 
          </div>
      </div> )}
    </form>
    <ul>
      {array.map((object)=>(
        <Home object={object} key={object.id}/>
        ))}
    </ul>
  </>
  )
}
