// OtpInput.js

import React, { useState } from 'react';
import './OtpInput.css';

const OtpInput = ({ numInputs = 6, onComplete }) => {
  const [otp, setOtp] = useState(new Array(numInputs).fill(''));

  const handleChange = (index, event) => {
    const newOtp = [...otp];
    newOtp[index] = event.target.value;
    setOtp(newOtp);

    // Once all fields are filled, call onComplete function
    if (newOtp.every(code => code !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  return (
    <div className="otp-container">
      {otp.map((value, index) => (
        <input key={index} type="text" maxLength="1" value={value} onChange={e => handleChange(index, e)} className="otp-input"/>
      ))}
    </div>
  );
};

export default OtpInput;

