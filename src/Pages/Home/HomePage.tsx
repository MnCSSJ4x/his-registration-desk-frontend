import React from 'react'
import Navbar from './Components/Navbar'
import CardSet from './Components/CardSet'

const HomePage: React.FC = () => {
  return (
    <div className='flex flex-col'>
        <Navbar/>
        <CardSet/>
    </div>
  )
}

export default HomePage