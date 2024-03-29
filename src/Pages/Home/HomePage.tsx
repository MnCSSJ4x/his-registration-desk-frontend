import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import CardSet from './Components/CardSet'
import { authState } from '../../auth/auth'
import { useRecoilValue } from 'recoil'
const HomePage: React.FC = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const authorized=useRecoilValue(authState);
  // console.log(authorized.token)
  useEffect(()=>{
    if(authorized===null){
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