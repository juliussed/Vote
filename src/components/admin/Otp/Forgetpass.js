import React,{useState } from 'react';
import { useQuery} from 'react-query'
import { makeRequest } from '../../../axios/Axio'
import { Link, useNavigate } from 'react-router-dom'
import './OtpInput.css'

const RandomNumberComparison = () => {
  // State to hold the randomly generated number
  const [randomNumber, setRandomNumber] = useState();
  // State to hold user input
  const [userInput, setUserInput] = useState(Array(6).fill(''));
  // State to hold comparison result
  const [comparisonResult, setComparisonResult] = useState('');

  

  // fecthing to generate a random 6-digit number
  const {isLoading,error,data} = useQuery(["otp"],()=>
        makeRequest.get("/otp").then((res)=>{
            return setRandomNumber(res.data);
        })
  );
 
  console.log(randomNumber);

  // Function to handle user input change
  function handleInputChange(index, event) {
    const value = event.target.value;
    if (!isNaN(value) && value !== '') {
      const updatedInput = [...userInput];
      updatedInput[index] = value;
      setUserInput(updatedInput);
    }
  }

  const navigate = useNavigate()
  
  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    // Convert user input array to a string
    const userNumber = userInput.join('');
    // Check if user input matches the random number
    if (parseInt(userNumber) === randomNumber) {
      navigate('/changepassword')
    } else {
      setComparisonResult('Wrong Code! Try again.');
    }
    // Clear user input array
    setUserInput(Array(6).fill(''));
  }

  return (
    <div>
      <p>Random Number: {randomNumber}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Enter 6-digit Number:
          {userInput.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(event) => handleInputChange(index, event)}
              maxLength={1}
            />
          ))}
        </label>
        <button id='but' type="submit">Done</button>
      </form>
      <p>{comparisonResult}</p>
    </div>
  );
};
export default RandomNumberComparison;
