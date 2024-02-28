import React, { useState } from 'react'
import PaystackPop from '@paystack/inline-js'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { makeRequest } from '../../axios/Axio'
import { useLocation, useNavigate } from 'react-router-dom'
import './paystack.scss'
import axios from 'axios'

export default function BankPaystack(){
  // taking amount to vote and email from user to pass to paystack
  const [email,setEmail] = useState("")
  const [amount,setAmount] = useState("")

  const [receipt,setReceipt] = useState("")
  const [phone,setPhone] = useState("")
  

  // initializing useLocation and UseNavigate Hooks 
  const navigate = useNavigate()
  const location = useLocation()

  // getting users id from the pathname using the Uselocation//
  const contestantId = location.pathname.split("/")[2]

  // fectching already existing vote count from contestant database to sum up the new vote if sucessful
  const [existingvotes,setExistingVotes]=useState("")

  const {isLoading,error,data} = useQuery(["votes"],()=>
      makeRequest.get("/existingvotes/"+contestantId).then((res)=>{
        return setExistingVotes(res.data[0].votes);
      })
  );

  // Convert the fetched fetched existing votes amount to an integer
  const integerAmountFromMySQL = parseInt(existingvotes, 10);

  // Convert the user input to an integer
  const integerUserInput = parseInt(amount, 10);

   /////// handling the voting function to increase contestants votes after being voted
   const queryClient = useQueryClient() 
   const newVotesMutation = useMutation(()=>{
     return makeRequest.put(`/votes/${contestantId}`,{integerUserInput,integerAmountFromMySQL})
     }, 
     {
       onSuccess: () => {
         // Invalidate and refetch
         queryClient.invalidateQueries(["votes"])
       },
     }
   )
   
   const handleVote = ()=>{
     newVotesMutation.mutate(contestantId)
   }

  ////////posting voters transaction data to database /////
  const voters_queryClient = useQueryClient()
  const votersdata_mutation = useMutation(()=>{
    return makeRequest.post("/votersdata",{email,phone,amount,receipt,contestantId})
    }, 
    {
      onSuccess: () => {
        // Invalidate and refetch
        voters_queryClient.invalidateQueries(["voters_info"])
      },
    }
  )

  const Votersdata = ()=>{
    votersdata_mutation.mutate({email,phone,amount,receipt,contestantId})
  }

  const [errors,setErrors]=useState({})
  ////// handling Paystack api call and increasing vote counts if trasaction is successful
  const onPay =(e)=>{
    e.preventDefault()

    const validationErrors = {}
    if(!email.trim()){
      validationErrors.email ="*Enter email"
    }
    if(!amount.trim()){
      validationErrors.amount ="*Enter amount"
    }
    if(!phone.trim()){
      validationErrors.phone ="*Enter phone number"
    }
    setErrors(validationErrors)


    if(Object.keys(validationErrors).length === 0){
      const paystack = new PaystackPop()
      paystack.newTransaction({
        key:"pk_test_e34e1d448604ac5625a457f0bfb37b8be770597e",
        amount:amount * 100,
        email,
        onSuccess(transaction){
          let message = `payment complete reference reciept ${transaction.reference}`
          setReceipt(transaction)
          console.log(transaction);
          alert(message)
          handleVote()
          Votersdata()
          navigate("/")
        },  
      }) 
    }  
  }
  return (
    <div className='paystack_main_container'>
      <div className="form">
        <p>Pay with Paystack</p>
        <input type='email' placeholder='Enter-email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        {errors.email && <span>{errors.email}</span>}
        <input type='tel' placeholder='Enter-amount' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
        {errors.amount && <span>{errors.amount}</span>}
        <input type='text' placeholder='Enter-phone' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        {errors.phone && <span>{errors.phone}</span>}
        <button onClick={onPay}>Click to Verify</button>
      </div>
    </div>
  )
}

