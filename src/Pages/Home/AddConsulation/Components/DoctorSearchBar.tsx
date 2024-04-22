import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../../../../auth/auth';

interface Doctor {
  dateOfBirth: string;
  employeeId: string;
  employeeStatus: "CHECKED_IN"|"CHECKED_OUT";
  employeeType: string;
  lastCheckIn: string;
  name: string;
}


interface DoctorSearchBarProps {
  onSelectDoctor: (doctor: Doctor) => void;
}

const DoctorSearchBar: React.FC<DoctorSearchBarProps> = ({ onSelectDoctor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isOpen,setOpen]=useState<Boolean>(false);
	const [doctorsFiltered,setDoctorsFiltered]=useState<Doctor[]>([]);
	const token=useRecoilValue(authState);
	useEffect(() => {
    // Filter patients based on the search term
    const filtered = doctors.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDoctorsFiltered(filtered);
  }, [searchTerm, doctors]);
  useEffect(() => {
    fetchDoctors();
  }, []);
  const fetchDoctors = async () => {
    fetch(`${process.env.REACT_APP_DB_URL}/employee/getAllDoctors`, {
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
      console.log(data)
			setDoctors(data);
		})
		.catch(error => {
			console.log(error.message);
		});
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    onSelectDoctor(doctor);
    setSearchTerm(doctor.name+"-"+doctor.employeeId);
    setOpen(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search doctors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={()=> setOpen(true)}
        className="w-full p-2 border focus:border-interactive04"
      />
      {doctorsFiltered.length > 0 && isOpen && (
        <div className="absolute w-1/4 bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10 h-1/4 overflow-auto">
          {doctors.map((doctor) => (
            <div
              key={doctor.employeeId}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectDoctor(doctor)}
            >
              {doctor.name}-{doctor.employeeId}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorSearchBar;
