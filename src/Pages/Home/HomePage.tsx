import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import CardSet from './Components/CardSet'
import { authState } from '../../auth/auth'
import { useRecoilValue } from 'recoil'
import PatientSearch from './Pharmacist/PatientSearch'

interface LoginPageProps {
  role: string;
  setRole: (role:string)=>void
}
const HomePage: React.FC<LoginPageProps> = ({ role,setRole}) => {
  const location = useLocation();
  const navigate=useNavigate();
  const authorized=useRecoilValue(authState);
  // console.log(authorized.token)
  useEffect(()=>{
    if(authorized===null){
      setRole("");
      navigate("/login")
    }
  })

  // Check if the current location pathname is "/home"
  const isHome = location.pathname === '/home';
  return (
    <div className='flex flex-col'>
        <Navbar role={role}/>
        {isHome && role==="DESK"?<CardSet/>:""}
        {isHome && role==="PHARMACIST"?<PatientSearch/>:""}

        <Outlet/>
    </div>
  )
}

export default HomePage