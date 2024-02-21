import React from 'react'
import Title from './Components/Title'
import Navbar from '../Components/Navbar'
import PatientForm from './Components/PatientForm'

const AddPatient = () => {
  return (
    <div>
        <Navbar/>
        <Title title='Add a new patient'></Title>
        <PatientForm></PatientForm>
    </div>
  )
}

export default AddPatient