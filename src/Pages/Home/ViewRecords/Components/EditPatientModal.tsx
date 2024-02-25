import React, { useState,useEffect } from 'react';

interface Patient {
	id: number,
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  // Add more fields as needed
}

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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPatient(prevState => ({
      ...prevState,
      [name]: value,
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
						<h1 className="w-full px-2 font-extrabold text-2xl mb-6">Edit Details for {editedPatient.patient_id}</h1>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
								<div className="px-2 flex items-center">
                    <label htmlFor="patient_id" className="text-text01 font-bold mr-2">Patient ID:</label>
                    <input type="text" id="patient_id" name="patient_id" value={editedPatient.patient_id} onChange={handleInputChange} className="border border-overlay01 rounded-lg focus:outline-overlay01 px-2 py-1" />
                  </div>
                  <div className="px-2 flex items-center">
                    <label htmlFor="name" className="text-text01 font-bold mr-2">Name:</label>
                    <input type="text" id="name" name="name" value={editedPatient.name} onChange={handleInputChange} className="border border-overlay01 rounded-lg focus:outline-overlay01 px-2 py-1" />
                  </div>
                  <div className="px-2 flex items-center">
                    <label htmlFor="age" className="text-text01 font-bold mr-2">Age:</label>
                    <input type="number" id="age" name="age" value={editedPatient.age.toString()} onChange={handleInputChange} className="border border-overlay01 rounded-lg focus:outline-overlay01 px-2 py-1" />
                  </div>
                  <div className="px-2 flex items-center">
                    <label htmlFor="gender" className="text-text01 font-bold mr-2">Gender:</label>
                    <input type="text" id="gender" name="gender" value={editedPatient.gender} onChange={handleInputChange} className="border border-overlay01 rounded-lg focus:outline-overlay01 px-2 py-1" />
                  </div>
                  {/* Add more fields here */}
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
