import React from 'react'
import Navbar from './Components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import CardSet from './Components/CardSet'

const HomePage: React.FC = () => {
  const location = useLocation();

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