import React from 'react'
import Title from '../Components/Title'
import PatientForm from './Components/PatientForm'

const AddPatient = () => {
  return (
    <div className="flex flex-col justify-center items-center h-auto mt-20">
        <Title title='Add a new patient'></Title>
        <PatientForm></PatientForm>
    </div>
  )
}

export default AddPatient