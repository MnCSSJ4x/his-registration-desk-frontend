import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientDetails from './PatientDetails';
import EditPatientModal from './EditPatientModal';

interface Patient {
	id: number,
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  // Add more fields as needed
}

const Records = () => {
	const navigate=useNavigate();
	const patients = [
		{
			id: 1,
			patient_id: "P12345",
			name: "John Doe",
			age: 30,
			gender: "Male",
		},
		{
			id: 2,
			patient_id: "P54321",
			name: "Jane Doe",
			age: 25,
			gender: "Female",
		},
		{
			id: 3,
			patient_id: "P78901",
			name: "Alice Smith",
			age: 40,
			gender: "Female",
		},
		{
			id: 4,
			patient_id: "P98765",
			name: "Bob Johnson",
			age: 35,
			gender: "Male",
		},
		{
			id: 5,
			patient_id: "P24680",
			name: "Michael Williams",
			age: 45,
			gender: "Male",
		},
		{
			id: 6,
			patient_id: "P13579",
			name: "Emily Brown",
			age: 28,
			gender: "Female",
		},
		{
			id: 7,
			patient_id: "P11223",
			name: "William Taylor",
			age: 55,
			gender: "Male",
		},
		{
			id: 8,
			patient_id: "P44556",
			name: "Sophia Martinez",
			age: 22,
			gender: "Female",
		},
		{
			id: 9,
			patient_id: "P99887",
			name: "Daniel Anderson",
			age: 38,
			gender: "Male",
		},
		{
			id: 10,
			patient_id: "P77889",
			name: "Olivia Thomas",
			age: 32,
			gender: "Female",
		},
		{
			id: 11,
			patient_id: "P11224",
			name: "David Jackson",
			age: 41,
			gender: "Male",
		},
		{
			id: 12,
			patient_id: "P66776",
			name: "Emma White",
			age: 29,
			gender: "Female",
		},
		{
			id: 13,
			patient_id: "P33445",
			name: "Josephine Harris",
			age: 47,
			gender: "Female",
		},
		{
			id: 14,
			patient_id: "P55789",
			name: "James Brown",
			age: 50,
			gender: "Male",
		},
		{
			id: 15,
			patient_id: "P99887",
			name: "Ava Lee",
			age: 27,
			gender: "Female",
		},
	];
	const [isPatientViewOpen, setPatientDetails] = useState(false);
	const [isPatientEditOpen, setPatientEdit] = useState(false);
	const [patientSelected,setPatient]=useState<Patient>();
	const [records, setRecords] = useState<{ id: number; patient_id: string; name: string; age: number; gender: string; }[]>(patients);
  const [searchQuery, setSearchQuery] = useState('');
  // useEffect(() => {
  //   // fetch('/api/records')
  //   //   .then((response) => response.json())
  //   //   .then((data) => setRecords(data));
  // }, []);
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
		setPatientEdit(false);
	}
  const handleDelete = (id: Patient) => {
    // Implement delete functionality
    console.log(`Deleting patient with ID: ${id}`);
  };

  const handleTransfer = (id: Patient) => {
    // Implement transfer functionality
    console.log(`Transferring patient with ID: ${id}`);
  };
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};
	

  const filteredRecords = records.filter((record) => {
    // Implement your search logic here
    return record.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className=" bg-white p-2 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-lg px-4 font-semibold mb-2">{record.name}</h2>
            <ul className="text-sm px-4 text-gray-500">
							{/* {console.log(record)} */}
              <li>Age: {record.age}</li>
              <li>Gender: {record.gender}</li>
            </ul>
						<div className="mt-4 flex flex-col md:flex-row md:flex-wrap lg:flex-row lg:flex-wrap justify-evenly">
							<button className="bg-interactive01 text-white py-2 rounded-md m-2 md:w-24 lg:w-20" onClick={() => handleView(record)}>View</button>
							<button className="bg-inverseSupport03 text-white py-2 rounded-md m-2 md:w-24 lg:w-20" onClick={() => handleEdit(record)}>Edit</button>
							<button className="bg-interactive01 text-white py-2 rounded-md m-2 md:w-24 lg:w-20" onClick={() => handleTransfer(record)}>Transfer</button>
							<button className="bg-inverseSupport01 text-white py-2 rounded-md m-2 md:w-24 lg:w-20" onClick={() => handleDelete(record)}>Delete</button>
						</div>

          </div>
        ))}
      </div>
			<div className="flex justify-center">
      <button 
        className="bg-interactive01 text-text04 px-4 py-2 rounded-lg m-4 hover:bg-hoverPrimary" 
        onClick={()=> navigate(-1)}
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
