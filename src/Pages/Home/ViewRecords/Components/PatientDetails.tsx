import React from 'react';

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
}

const PatientDetails: React.FC<Props> = ({ patient, isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
            <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
							<h1 className="w-full px-2 font-extrabold text-2xl mb-6">Patient Details for {patient.patient_id}</h1>
              <div className="grid grid-cols-2 gap-4">
                <div className="px-2">
                  <span className="text-gray-600">Patient ID:</span> <span className="font-medium">{patient.patient_id}</span>
                </div>
                <div className="px-2">
                  <span className="text-gray-600">Name:</span> <span className="font-medium">{patient.name}</span>
                </div>
                <div className="px-2">
                  <span className="text-gray-600">Age:</span> <span className="font-medium">{patient.age}</span>
                </div>
                <div className="px-2">
                  <span className="text-gray-600">Gender:</span> <span className="font-medium">{patient.gender}</span>
                </div>
                {/* Add more fields here */}
              </div>
              <div className="mt-4 flex justify-center">
                <button className="bg-interactive01 text-text04 py-2 px-4 rounded-lg hover:bg-hoverPrimary focus:outline-none" onClick={onClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientDetails;
