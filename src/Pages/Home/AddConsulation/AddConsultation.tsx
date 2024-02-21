import React from 'react'
import Navbar from '../Components/Navbar'
import Title from '../Components/Title'
import ConsultationForm from './Components/ConsultationForm'

const AddConsultation = () => {
  return (
    <>
        <Navbar/>
        <Title title='Add a new consultation'></Title>
        <div><ConsultationForm></ConsultationForm></div>
    </>
  )
}

export default AddConsultation