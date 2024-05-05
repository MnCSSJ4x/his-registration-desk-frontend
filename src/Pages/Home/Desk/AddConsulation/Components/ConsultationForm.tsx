import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientSearchBar from './PatientSearchBar';
import DoctorSearchBar from './DoctorSearchBar';
import { Patient } from '../../../../Types/Patient';
import { useRecoilValue } from 'recoil';
import { authState } from '../../../../../auth/auth';

interface Doctor {
  dateOfBirth: string;
  employeeId: string;
  employeeStatus: "CHECKED_IN"|"CHECKED_OUT";
  employeeType: string;
  lastCheckIn: string;
  name: string;
}

interface FormData {
  patientId: string;
  doctorID: string;
  doctor: Doctor|null;
  patient: Patient|null
}

interface FormErrors {
  [key: string]: string;
}

const ConsultationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    patientId: '',
    patient: null,
    doctorID: '',
    doctor: null
  });
  const token=useRecoilValue(authState);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData)
    console.log(JSON.stringify({patientId: formData.patientId, doctorId: formData.doctorID}))
    fetch(`${process.env.REACT_APP_DB2_URL}/consultation/addConsultation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({patientId: formData.patientId, doctorId: formData.doctorID})
    })
    .then((response) => {
      console.log(response)
      if (!response.ok) {
        alert(response.status)
      }
      console.log('Data posted successfully:', response.status);
      alert("Consultation added!")
      navigate("/home")
    })
  };

  const handleBack = () => {
    navigate('/home');
  };

  const handlePatientSelect = (patient: Patient) => {
    setFormData((prevData) => ({
      ...prevData,
      patientId: patient.patientId,
      patient: patient
    }));
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setFormData((prevData) => ({
      ...prevData,
      doctor: doctor,
      doctorID: doctor.employeeId
    }));
  };

  return (
    <form className="w-auto mt-8 px-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-8 px-8">
        <div>
          <label htmlFor="patientId">Patient ID*</label>
          <PatientSearchBar onSelectPatient={handlePatientSelect} />
          {errors.patientId && <p className="text-danger02">{errors.patientId}</p>}
        </div>
        <div>
          <label htmlFor="doctorName">Doctor Name*</label>
          <DoctorSearchBar onSelectDoctor={handleDoctorSelect} departmentID={null}/>
          {errors.doctorName && <p className="text-danger02">{errors.doctorName}</p>}
        </div>
      </div>

      <div className="mt-4 px-8 flex justify-center gap-8">
        <button type="submit" className="bg-interactive01 text-text04 px-16 py-2 rounded-lg hover:bg-hoverPrimary">
          Submit
        </button>
        <button className="bg-interactive01 text-text04 px-16 py-2 rounded-lg hover:bg-hoverPrimary" onClick={handleBack}>
          Back
        </button>
      </div>
    </form>
    );
  };
  
  export default ConsultationForm;
  
