import React from 'react'
import Title from '../../Components/Title'
import Records from './Components/Records'

const ViewRecords = () => {
  return (
    <div className="flex flex-col justify-center items-center h-auto mt-20">
        <Title title='Patients'></Title>
        <Records/>
    </div>
  )
}

export default ViewRecords