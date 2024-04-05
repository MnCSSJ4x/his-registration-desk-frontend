import React, { useState, useEffect } from 'react';
import { Patient } from '../../../Types/Patient';
import { useRecoilValue } from 'recoil';
import { authState } from '../../../../auth/auth';

interface Props {
	patients: Patient[];
	setPatients: (patients: Patient[])=>void;
  onSelect: (selectedItem: Patient) => void;
	searchTerm: string;
	setSearchTerm: (term: string)=> void;
}

const SearchBar: React.FC<Props> = ({ patients, setPatients,onSelect,searchTerm,setSearchTerm }) => {
  
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
	const [isOpen,setOpen]=useState<Boolean>(false);
	const token=useRecoilValue(authState);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    fetch(`${process.env.REACT_APP_DB_URL}/patient`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token.token}`
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
			setPatients(data);
		})
		.catch(error => {
			console.log(error.message);
		});
  };

  useEffect(() => {
    // Filter patients based on the search term
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  const handleSelectPatient = (patient: Patient) => {
    onSelect(patient);
		setSearchTerm(patient.name+"-"+patient.patientId)
		setOpen(false);
  };

  return (
    <div className="w-96 my-10 relative h-10">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
				onClick={()=>setOpen(true)}
        className="w-full bg-gray-200 text-gray-800 rounded-full pt-2 px-4 pl-10 h-10 focus:outline-none focus:bg-white"
      />
      <svg
        className="absolute right-1 top-1 h-5 w-5 text-gray-500 scale-150"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.293 13.707a1 1 0 01-1.414 1.414l-3-3a1 1 0 111.414-1.414l3 3zM11 15a4 4 0 100-8 4 4 0 000 8z"
          clipRule="evenodd"
        />
      </svg>
      {isOpen && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10">
          {filteredPatients.map((patient) => (
            <div
              key={patient.patientId}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectPatient(patient)}
            >
              {patient.name} - {patient.patientId}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
