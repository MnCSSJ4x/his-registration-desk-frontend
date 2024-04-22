import React from 'react'
import Title from '../../Components/Title'
import DeleteForm from './Components/DeleteForm'

const DeletePatient = () => {
 
  
  return (
    <div className="flex flex-col justify-center items-center h-auto mt-20">
        <Title title='Delete a Patient Record'></Title>
        <DeleteForm></DeleteForm>
    </div>
  )
}

export default DeletePatient