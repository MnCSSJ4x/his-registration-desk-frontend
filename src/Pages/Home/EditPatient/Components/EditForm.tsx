import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Patient } from '../../../Types/Patient';
import { useRecoilValue } from 'recoil';
import { authState } from '../../../../auth/auth';
import DatePicker from 'react-datepicker';
interface Props {
  patient: Patient;
  updateRecord: (patient: Patient)=>void;
  setClose: (val: Boolean)=>void
  setSearchTerm: (val: string)=> void
}
const EditForm: React.FC<Props> = ({patient,updateRecord,setClose,setSearchTerm}) => {
  const token=useRecoilValue(authState)
  const [editedPatient, setEditedPatient] = useState<Patient>(patient);
  const handleInputChange = (name: string, value: any) => {
    setEditedPatient(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDateChange = ( date: Date) => {
    // Update the state with the new selected date
    setEditedPatient((prevState) => ({
      ...prevState,
      dateOfBirth: date.toISOString(), // Convert the date to ISO string format before updating the state
    }));
  };
  useEffect(()=>{
    setEditedPatient(patient)
  },[patient])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(editedPatient);
		if (token) { // Ensure token is available before making the request
      fetch(`${process.env.REACT_APP_DB_URL}/patient/${editedPatient.patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
        },
				body: JSON.stringify(editedPatient)

      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch patient records');
        }
      })
      .then((data) => {
        updateRecord(data);
        setSearchTerm("");
        alert("Patient Edited!")
      })
      .catch((error) => {
        console.log(error.message);
				alert(error.message)
      });
    }
		else{
			alert("Session timed out");
		}
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md shadow-md transition duration-300 transform hover:scale-105">
                <div className="grid grid-cols-2 gap-4">
                {Object.entries(editedPatient).map(([key, value]) => (
                    <div key={key} className="px-2 flex items-center">
                      <label htmlFor={key} className="text-text01 font-bold mr-2">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </label>
                      {key === "dateOfBirth" ? (
                        <DatePicker
                          id={key}
                          name={key}
                          dateFormat="dd/MM/yyyy"
                          showYearDropdown
                          yearDropdownItemNumber={15}
                          scrollableYearDropdown
                          selected={new Date(value)} // Assuming value is a valid date string
                          onChange={(value:Date) => handleDateChange(value)} // Pass key and selected date to handleDateChange
                          className="border border-overlay01 rounded-lg focus:outline-overlay01 px-2 py-1" // Add any additional className for styling
                        />
                      ) : key === "gender" ? (
                        <select
                          id={key}
                          name={key}
                          value={value as string}
                          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                          className="border border-overlay01 rounded-lg focus:outline-overlay01 px-2 py-1" // Add any additional className for styling
                        >
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Others</option>
                        </select>
                      ) : key === "patientType" ? (
                        <select
                          id={key}
                          name={key}
                          value={value as string}
                          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                          className="border border-overlay01 rounded-lg focus:outline-overlay01 px-2 py-1" // Add any additional className for styling
                        >
                          <option value="INPATIENT">Inpatient</option>
                          <option value="OUTPATIENT">Outpatient</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          id={key}
                          name={key}
                          value={value}
                          onChange={(e)=>handleInputChange(e.target.name,e.target.value)}
                          className="border border-overlay01 rounded-lg focus:outline-overlay01 px-2 py-1" // Add any additional className for styling
                        />
                      )}
                    </div>
                  ))}

                </div>
                <div className="mt-4 flex justify-end">
                  <button type="submit" className="bg-interactive01 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none">Submit</button>
                </div>
              </form>
              </>
  );
};

export default EditForm;
