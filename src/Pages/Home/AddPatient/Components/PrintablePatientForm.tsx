import React, {useRef} from 'react';
// import { useReactToPrint } from 'react-to-print';

interface FormData {
  firstName: string;
  lastName: string;
  aabhaId: string;
  aadharId: string;
  dob: string;
  email: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  patientType: string;
  address: string;
  [key: string]: string; // Index signature
}

interface PatientPrintProps{
	patient: FormData;
	isOpen: boolean;
	onClose: (Set: boolean)=>void;
}
const PrintablePatientForm: React.FC<PatientPrintProps> = ({patient,isOpen,onClose}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = ()=> {window.print()}
	// useReactToPrint({
	// 	content: ()=> printRef.current,
	// })
	const fields = [
		{ label: "First Name", value: patient.firstName },
		{ label: "Last Name", value: patient.lastName },
		{ label: "AABHA ID", value: patient.aabhaId },
		{ label: "AADHAR ID", value: patient.aadharId },
		{ label: "Date of Birth", value: patient.dob },
		{ label: "Email", value: patient.email },
		{ label: "Emergency Contact Name", value: patient.emergencyContactName },
		{ label: "Emergency Contact Number", value: patient.emergencyContactNumber },
		{ label: "Patient Type", value: patient.patientType },
		{ label: "Address", value: patient.address },
	];
  return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={()=>onClose(false)}></div>
            <div className="relative bg-white rounded-lg p-8 w-3/4">
						<h1 className="w-full px-2 font-extrabold text-2xl mb-6">Patient Details</h1>
						<div ref={printRef} className="m-2">
						<div className="grid grid-cols-2 gap-4">
							{fields.map((field, index) => (
								<div className="px-2" key={index}>
										<span className="text-text01">{field.label}:</span>{" "}
										<span className="font-medium">{field.value}</span>
									</div>
								))}
              </div>
						</div>
						<div className="flex justify-end mt-1">
						<button
							className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
							onClick={() => handlePrint()} // Trigger browser print dialog
						>
							Print
						</button>
						<button
							className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
							onClick={()=> onClose(false)}
						>
							Close
						</button>
					</div>
					</div>
				</div>
			</div>
  );
};

export default PrintablePatientForm;
