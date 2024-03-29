import React from 'react';
import { Patient,getAge } from '../../../Types/Patient';

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
            <div className="relative bg-white rounded-lg p-8 max-w-lg w-full">
							<h1 className="w-full px-2 font-extrabold text-2xl mb-6">Patient Details for {patient.patientId}</h1>
              <div className="grid grid-cols-2 gap-4">
                <div className="px-2">
                  <span className="text-text01">Aabha ID:</span> <span className="font-medium">{patient.aabhaId}</span>
                </div>
                <div className="px-2">
                  <span className="text-text01">Aadhar ID:</span> <span className="font-medium">{patient.aadharId}</span>
                </div>
                <div className="px-2">
                  <span className="text-text01">Email:</span> <span className="font-medium">{patient.emailId}</span>
                </div>
                <div className="px-2">
                  <span className="text-text01">Age:</span> <span className="font-medium">{getAge(patient.dateOfBirth)}</span>
                </div>
                <div className="px-2">
                  <span className="text-text01">Emergency Contact Number:</span> <span className="font-medium">{patient.emergencyContactNumber}</span>
                </div>
                <div className="px-2">
                  <span className="text-text01">Gender:</span> <span className="font-medium">{patient.gender}</span>
                </div>
                <div className="px-2">
                  <span className="text-text01">Patient Type:</span> <span className="font-medium">{patient.patientType}</span>
                </div>
                <div className="px-2">
                  <span className="text-text01">Discharge Status:</span> <span className="font-medium">{patient.dischargeStatus}</span>
                </div>
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
