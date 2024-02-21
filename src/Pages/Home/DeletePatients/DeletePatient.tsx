import React from 'react'
import Navbar from '../Components/Navbar'
import Title from '../Components/Title'
import DeleteForm from './Components/DeleteForm'

const DeletePatient = () => {
  return (
    <>
        <Navbar/>
        <Title title='Delete a Patient Record'></Title>
        <DeleteForm></DeleteForm>
    </>
  )
}

export default DeletePatient