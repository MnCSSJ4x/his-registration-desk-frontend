import React from 'react'
import Navbar from './Components/Navbar'
import LoginForm from './Components/LoginForm'
interface LoginPageProps {
  role: string;
  setRole: (role:string)=>void
}
const LoginPage : React.FC<LoginPageProps> = ({ role,setRole}) => {
  return (
    <div className='flex flex-col'>
        <Navbar></Navbar>
        <LoginForm setRole={setRole}></LoginForm>
    </div>
  )
}

export default LoginPage