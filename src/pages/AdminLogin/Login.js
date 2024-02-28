import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contextApi/authContext';
import './login.scss'
import img from '../../images/Juju-Logo.png'


export default function Login() {
  const {login}= useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username:"",
    password:"",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e)=> {
    setInputs((prev)=>({ ...prev, [e.target.name]:e.target.value}))
  };

  const handleLogin = async (e)=>{ 
    e.preventDefault();
    try{
      await login(inputs);
      navigate("/admin")
    }catch(err){
      setErr(err.response.data)
      
    }
  };

  return (
    <div>
      <section id='main_container'>
        <form>
          <div id='login-frame'>
            <img src={img} alt="" />
            <h1>Login as Admin</h1>
            <input type='text' placeholder='Username' name='username' onChange={handleChange} ></input>
            <input type='password' placeholder='password' name='password' onChange={handleChange}></input>
            <span>{err && err}</span>
            <p><Link to="/forget">forgot password?</Link></p>
            <button type="submit" onClick={handleLogin}>SIGN IN</button>
          </div>
        </form>
      </section>
    </div>
  )
}


// register
  // const [register,setRegister] = useState({
  //   username:"",
  //   password:""
  // });
  // const handleReg = (e)=> {
  //   setRegister((prev)=>({ ...prev, [e.target.name]:e.target.value}))
  // };

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   try{
  //     await axios.post("http://localhost:4000/register",register)
  //   }catch (err){
  //     setErr(err.response.data);
  //   }
  // }

{/* <form >
          <div id='lregister_frame'>
            <h1>Register</h1>
            <input type='text' placeholder='Username' name='username' onChange={handleReg}></input>
            <input type='text' placeholder='password' name='password' onChange={handleReg} ></input>
            {err && err}
            <button id='submit_button' type="submit" onClick={handleClick}>SUBMIT & CONTINUE</button>
          </div>
</form>   */}