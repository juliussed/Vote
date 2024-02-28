import React, { useContext, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import AdminLayout from "./components/layout/AdminLayout"
import Admin from './pages/Admin'
import Add from './pages/Add'
import Update from './pages/Update'
import BarChart from './pages/BarChart'
import AdminBarchart from './components/admin/adminchart/AdminBarChart' 
import BankPaystack  from './components/payment/BankPaystack'
import PaymentOptionpage from './components/payment/PaymentOptionpage'
import Transactions from './components/admin/transactions/Transactions'
import Login from './pages/AdminLogin/Login'
import { AuthContext } from './contextApi/authContext'
import {QueryClient,QueryClientProvider,} from 'react-query'
import Forgetpass from './components/admin/Otp/Forgetpass'
import Changepass from './pages/AdminLogin/Changepass/Changepass'


export default function App() {
  const queryClient = new QueryClient()
  const {currentUser} = useContext(AuthContext)
  const [array,setArray] =useState([])

  const ProtectedRoute = ({children})=>{
    if(!currentUser){return <Navigate to='/login' />}
    return children
  }

  const handleAddArray = (object)=>{
    setArray((array)=>[...array,object])
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index="/home" element={<Home/>}/>
            <Route path="/chart" element={<BarChart/>}/>
            <Route path="/paymentoption/:id" element={<PaymentOptionpage/>}/>
            <Route path="/bank/:id" element={<BankPaystack/>}/>
          </Route>

          <Route path="/login" element={<Login/>}/>

          <Route path='/' element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
            <Route path="/admin" element={<Admin />}/>
            <Route path="/transactions" element={<Transactions/>}/>
            <Route path="/add" element={<Add onHandle={handleAddArray} array={array}/>}/>
            <Route path="/update/:id" element={<Update/>}/>
            <Route path="/adminchart" element={<AdminBarchart/>}/>
          </Route>

          <Route path='/forget' element={<Forgetpass/>}/>
          <Route path='/changepassword' element={<Changepass/>}/>

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
};
