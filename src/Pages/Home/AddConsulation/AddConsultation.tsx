import React from 'react'
import Title from '../Components/Title'
import ConsultationForm from './Components/ConsultationForm'

const AddConsultation = () => {
  return (
    <div className="flex flex-col justify-center items-center h-auto mt-20">
        <Title title='Add a new consultation'></Title>
        <ConsultationForm></ConsultationForm>
    </div>
  )
}

export default AddConsultation