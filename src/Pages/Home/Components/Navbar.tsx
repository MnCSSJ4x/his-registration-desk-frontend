import React from 'react'
import { authState } from '../../../auth/auth';
import { useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const name = "John Doe";
  const navigate=useNavigate();
  const resetAuth=useResetRecoilState(authState);
  const handleLogout= ()=>{
    resetAuth();
    navigate("/login");
  }
  return (
    <nav className="bg-ui02 p-4 flex flex-wrap justify-between items-center">
      {/* Logo on the left */}
      <a href="/home" className="text-link01 text-4xl font-bold mb-4 md:mb-0 md:mr-4">HealthPlus</a>

      {/* Navigation links on the right */}
      <div className="flex flex-wrap space-x-4 px-12">
        <p className='text-lg text-text01'>Hi {name}</p>
        <a href="/" className="hover:text-hoverPrimaryText text-link01 text-lg" onClick={()=>handleLogout()}>Logout</a>
      </div>
    </nav>
  )
}

export default Navbar