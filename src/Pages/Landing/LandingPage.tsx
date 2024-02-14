import React from 'react'
import Navbar from './Components/Navbar'
import Showcase from './Components/Showcase'
import CardSet from './Components/CardSet'

const LandingPage = () => {
  return (
    <div className='flex flex-col'>
        <Navbar></Navbar>
        <Showcase></Showcase>
        <CardSet></CardSet>
        
    </div>
  )
}

export default LandingPage