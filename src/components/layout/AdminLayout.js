import React from 'react'
import Adnavbar from "../admin/navbar/Adnavbar"
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        <Adnavbar/>
        <Outlet/>
    </div>
  )
}
