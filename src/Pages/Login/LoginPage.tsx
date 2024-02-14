import React from 'react'
import Navbar from './Components/Navbar'
import LoginForm from './Components/LoginForm'

const LoginPage = () => {
  return (
    <div className='flex flex-col'>
        <Navbar></Navbar>
        <LoginForm></LoginForm>
    </div>
  )
}

export default LoginPage