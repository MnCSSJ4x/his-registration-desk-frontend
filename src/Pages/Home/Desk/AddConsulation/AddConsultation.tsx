import React, { useState } from 'react'
import Title from '../../Components/Title'
import ConsultationForm from './Components/ConsultationForm'
import ReassignForm from './Components/ReAssignForm';

const AddConsultation = () => {
  const [reassign,setReassign]=useState<boolean>(false);
  return (
    <div className="flex flex-col justify-center items-center h-auto mt-20">
        <Title title='Add/Reassign a consultation'></Title>
        <button
        onClick={()=>setReassign(!reassign)}
        className={`w-12 h-8 rounded-full p-1 flex items-center ${
          reassign ? "bg-interactive01" : "bg-interactive02"
        }`}
      >
        <span
          className={`w-5 h-5 rounded-full bg-white shadow-md transform ${
            reassign ? "translate-x-full" : ""
          }`}
        ></span>
      </button>
        <h2 className="font-bold">{reassign ? "Reassign" : "Add"}</h2>
        {reassign?
        <ReassignForm/>:
        <ConsultationForm/>
      }
    </div>
  )
}

export default AddConsultation