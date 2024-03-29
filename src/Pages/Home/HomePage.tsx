import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import CardSet from './Components/CardSet'
import { authState } from '../../auth/auth'
import { useRecoilState } from 'recoil'
const HomePage: React.FC = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const authorized=useRecoilState(authState);
  // console.log(authorized.token)
  useEffect(()=>{
    if(authorized[0].token===null){
      navigate("/login")
    }
  })

  // Check if the current location pathname is "/home"
  const isHome = location.pathname === '/home';
  return (
    <div className='flex flex-col'>
        <Navbar/>
        {isHome?<CardSet/>:''}
        <Outlet/>
    </div>
  )
}

export default HomePage