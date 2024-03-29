import React, { useState,useEffect } from 'react';
import {Patient, getAge} from "../../../Types/Patient"
import DatePicker from "react-datepicker";
interface Props {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedPatient: Patient) => void;
}

const EditPatientModal: React.FC<Props> = ({ patient, isOpen, onClose, onSubmit }) => {
  const [editedPatient, setEditedPatient] = useState<Patient>(patient);
	useEffect(() => {
    setEditedPatient(patient);
  }, [patient]);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(editedPatient);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
            <div className="relative bg-white rounded-lg p-8 w-3/4">
						<h1 className="w-full px-2 font-extrabold text-2xl mb-6">Edit Details for {editedPatient.patientId}</h1>
              <form onSubmit={handleSubmit}>
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
                  <button type="button" className="bg-decorative01 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none ml-2" onClick={onClose}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPatientModal;
