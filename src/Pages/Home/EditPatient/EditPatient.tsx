import React from 'react'
import Title from '../Components/Title'
import EditForm from './Components/EditForm'

const EditPatient = () => {
  return (
    <div className="flex flex-col justify-center items-center h-auto mt-20">
      <Title title='Edit Patient Details'></Title>
      <EditForm/>
      </div>
  )
}

export default EditPatient