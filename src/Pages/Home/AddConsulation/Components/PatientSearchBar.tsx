import React, { useState, useEffect } from 'react';
import { Patient } from '../../../Types/Patient';
import { useRecoilValue } from 'recoil';
import { authState } from '../../../../auth/auth';

interface PatientSearchBarProps {
  onSelectPatient: (patient: Patient) => void;
}

const PatientSearchBar: React.FC<PatientSearchBarProps> = ({ onSelectPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
	const [isOpen,setOpen]=useState<Boolean>(false);
	const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
	const token=useRecoilValue(authState);
  useEffect(() => {
    // Filter patients based on the search term
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    fetch(`${process.env.REACT_APP_DB_URL}/patient`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`
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


  const handleSelectPatient = (patient: Patient) => {
    onSelectPatient(patient);
		setSearchTerm(patient.name+"-"+patient.patientId)
		setOpen(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search patients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={()=>setOpen(true)}
        className="w-full p-2 border focus:border-interactive04"
      />
      {filteredPatients.length > 0 && isOpen&& (
        <div className="absolute w-1/4 bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10 h-1/4 overflow-auto">
          {patients.map((patient) => (
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

export default PatientSearchBar;
