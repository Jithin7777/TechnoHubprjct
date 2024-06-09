import React from 'react'
import { useNavigate } from 'react-router-dom'

function Admin() {

  const navigate = useNavigate()

  const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate("/")
  }
  return (
    <div class='p-5'>
      <h1>WELCOMR TO ADMIN DASHBOARD</h1>
      <button class='btn btn-primary' onClick={logout}>logout</button>
    </div>
  )
}

export default Admin