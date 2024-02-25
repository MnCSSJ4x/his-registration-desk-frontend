import React from 'react'
import Title from '../Components/Title'
import TransferForm from './Component/TransferForm'

const ViewTransfers = () => {
  return (
    <div className="flex flex-col justify-center items-center h-auto mt-20">
        <Title title='Transfers'></Title>
        <TransferForm></TransferForm>
    </div>
  )
}

export default ViewTransfers