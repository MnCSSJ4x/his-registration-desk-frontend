import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientDetails from './PatientDetails';
import EditPatientModal from './EditPatientModal';
import { Patient,getAge } from '../../../Types/Patient';
import { useRecoilState } from 'recoil';
import { authState } from '../../../../auth/auth';

const Records = () => {
	const token=useRecoilState(authState);
	const navigate=useNavigate();
	const [isPatientViewOpen, setPatientDetails] = useState(false);
	const [isPatientEditOpen, setPatientEdit] = useState(false);
	const [patientSelected,setPatient]=useState<Patient>();
	const [records, setRecords] = useState< Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    if (token) { // Ensure token is available before making the request
      fetch(`${process.env.REACT_APP_DB_URL}/patient`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token[0].token}`
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch patient records');
        }
      })
      .then(data => {
        console.log(data);
        setRecords(data);
      })
      .catch(error => {
        console.log(error.message);
      });
    }
  }, []);
	const handleView = (id: Patient) => {
    // Navigate to view patient details page
		setPatientDetails(true);
		setPatient(id);
    console.log(`Viewing details of patient with ID: ${id}`);
  };

  const handleEdit = (id: Patient) => {
    // Navigate to edit patient details page
		setPatientEdit(true);
		setPatient(id);
    console.log(`Editing details of patient with ID: ${id}`);
  };
	const handleEditSubmit=(updatedPatient: Patient)=>{
		console.log(updatedPatient);
		if (token) { // Ensure token is available before making the request
      fetch(`${process.env.REACT_APP_DB_URL}/patient/${updatedPatient.patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
					'Authorization': `Bearer ${token[0].token}`
        },
				body: JSON.stringify(updatedPatient)

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
      })
      .catch((error) => {
        console.log(error.message);
				alert(error.message)
      });
			setPatientEdit(false);
			setPatient(undefined);
    }
		else{
			alert("Session timed out");
		}
	}
  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log(`Deleting patient with ID: ${id}`);
  };

  const handleTransfer = (id: string) => {
    // Implement transfer functionality
    console.log(`Transferring patient with ID: ${id}`);
  };
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};
	
	const updateRecord = (updatedRecord: Patient) => {
		// Find the index of the edited record in the array
		const index = records.findIndex(record => record.patientId === updatedRecord.patientId);
	
		if (index !== -1) {
			// Create a copy of the records array
			const updatedRecords = [...records];
			// Replace the record at the found index with the updated record
			updatedRecords[index] = updatedRecord;
			// Set the state with the updated array
			setRecords(updatedRecords);
		} else {
			console.error("Record not found");
		}
	};

	
	const filteredRecords = Array.isArray(records) ? records.filter((record) => {
		return record.name.toLowerCase().includes(searchQuery.toLowerCase());
	}) : [];

  return (
    <div className="flex flex-col w-auto mt-8 px-4">
        <input
          type="text"
          className="flex-grow px-4 py-2 rounded-md border my-4 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50"
          placeholder="Search records..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 h-100 overflow-scroll shadow-md p-4">
        {filteredRecords?.map((record) => (
          <div
            key={record.patientId}
            className=" bg-white p-2 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-lg px-4 font-semibold mb-2">{record.name}</h2>
            <ul className="text-sm px-4 text-gray-500">
							<li><strong>Aabha ID:</strong> {record.aabhaId}</li>
							<li><strong>Aadhar ID:</strong> {record.aadharId}</li>
							<li><strong>Email:</strong> {record.emailId}</li>
							<li><strong>Age:</strong> {getAge(record.dateOfBirth)}</li>
							<li><strong>Emergency Contact Number:</strong> {record.emergencyContactNumber}</li>
							<li><strong>Gender:</strong> {record.gender}</li>
							<li><strong>Patient Type:</strong> {record.patientType}</li>
							<li><strong>Discharge Status:</strong> {record.dischargeStatus}</li>
            </ul>
						<div className="mt-4 flex flex-col md:flex-row md:flex-wrap lg:flex-row lg:flex-wrap justify-evenly">
							<button className="bg-interactive01 text-white py-2 rounded-md m-2 md:w-24 lg:w-20" onClick={() => handleView(record)}>View</button>
							<button className="bg-inverseSupport03 text-white py-2 rounded-md m-2 md:w-24 lg:w-20" onClick={() => handleEdit(record)}>Edit</button>
							<button className="bg-interactive01 text-white py-2 rounded-md m-2 md:w-24 lg:w-20" onClick={() => handleTransfer(record.patientId)}>Transfer</button>
							<button className="bg-inverseSupport01 text-white py-2 rounded-md m-2 md:w-24 lg:w-20" onClick={() => handleDelete(record.patientId)}>Delete</button>
						</div>

          </div>
        ))}
      </div>
			<div className="flex justify-center">
      <button 
        className="bg-interactive01 text-text04 px-4 py-2 rounded-lg m-4 hover:bg-hoverPrimary" 
        onClick={()=> navigate("/home")}
      >
        Back
      </button>
			{patientSelected && <PatientDetails patient={patientSelected} isOpen={isPatientViewOpen} onClose={()=> setPatientDetails(false)}/>}
			{patientSelected && <EditPatientModal patient={patientSelected} isOpen={isPatientEditOpen} onClose={()=> setPatientEdit(false)} onSubmit={(updatedPatient)=>handleEditSubmit(updatedPatient)}/>}
    </div>
    </div>
  );
};

export default Records;
