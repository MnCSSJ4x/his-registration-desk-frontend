import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorSearchBar from './DoctorSearchBar';
import { Doctor } from '../../../../Types/Doctor'; 
import { useRecoilValue } from 'recoil';
import { authState } from '../../../../../auth/auth';
import DepartmentSearchBar from './DepartmentSearchBar';

interface FormData {
  doctorId: string;
  newDoctorId: string;
}

interface FormErrors {
  [key: string]: string;
}

const ReassignForm: React.FC = () => {
  const navigate = useNavigate();
	const [departmentID,setDepartmentID]=useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    doctorId: '',
    newDoctorId: ''
  });
  const token=useRecoilValue(authState);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    fetch(`${process.env.REACT_APP_DB2_URL}/consultation/reassignDoctor`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to post data');
      }
      console.log('Data posted successfully:', response.status);
      alert("Consultation reassigned!")
      navigate("/home")
    })
  };

  const handleBack = () => {
    navigate('/home');
  };

  const handleDoctorSelect = (doctor: Doctor, type: string) => {
    if (type === 'old') {
      setFormData(prevData => ({
        ...prevData,
        doctorId: doctor.employeeId
      }));
    } else if (type === 'new') {
      setFormData(prevData => ({
        ...prevData,
        newDoctorId: doctor.employeeId
      }));
    }
  };
	const handleSelectDepartment=(departmentid:string)=>{
		console.log(departmentid)
		setDepartmentID(departmentid)
	}
  return (
    <form className="w-auto mt-8 px-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-8 px-8">
        <div>
          <label htmlFor="department">Department*</label>
          <DepartmentSearchBar onSelectDepartment={(departmentid)=>handleSelectDepartment(departmentid) } />
          {errors.department && <p className="text-danger02">{errors.department}</p>}
        </div>
				{departmentID!=="" && 
				<>
        <div>
          <label htmlFor="oldDoctor">Old Doctor*</label>
          <DoctorSearchBar onSelectDoctor={(doctor) => handleDoctorSelect(doctor, 'old')}departmentID={departmentID}/>
          {errors.oldDoctor && <p className="text-danger02">{errors.oldDoctor}</p>}
        </div>
        <div>
          <label htmlFor="newDoctor">New Doctor*</label>
          <DoctorSearchBar onSelectDoctor={(doctor) => handleDoctorSelect(doctor, 'new')} departmentID={departmentID} />
          {errors.newDoctor && <p className="text-danger02">{errors.newDoctor}</p>}
        </div>
				</>
				}
      </div>
			{departmentID!=="" && 
      <div className="mt-4 px-8 flex justify-center gap-8">
        <button type="submit" className="bg-interactive01 text-text04 px-16 py-2 rounded-lg hover:bg-hoverPrimary">
          Submit
        </button>
        <button className="bg-interactive01 text-text04 px-16 py-2 rounded-lg hover:bg-hoverPrimary" onClick={handleBack}>
          Back
        </button>
      </div>
			}
    </form>
  );
};
  
export default ReassignForm;
