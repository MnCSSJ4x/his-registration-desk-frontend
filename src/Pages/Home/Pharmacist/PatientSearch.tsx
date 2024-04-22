import React,{useState} from 'react'
import Title from '../Components/Title'
import SearchBar from '../Desk/EditPatient/Components/SearchPatient'
import { Patient } from '../../Types/Patient'

const PatientSearch = () => {
  const [patientSelected,setPatient]=useState<Patient|undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [patients, setPatients] = useState<Patient[]>([]);
	const [fetchedPrescriptions, setFetchedPrescriptions] = useState<any[]>([]);
	const handleBack = () => {
    setSearchTerm('');
    setPatient(undefined);
    setFetchedPrescriptions([]); // Clear fetched prescriptions
  };
	const handleClick = async () => {
    if (!patientSelected) {
      alert('Please select a patient first.');
      return;
    }

    try {
      // const response = await fetch(/* URL to fetch prescriptions */);
      // const fetchedData = await response.json();
      // setFetchedPrescriptions(fetchedData); // Update prescriptions state
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      alert('An error occurred while fetching prescriptions.');
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-auto mt-20">
      <Title title='View Prescriptions'></Title>
      <div className="flex flex-row">
        <SearchBar patients={patients} setPatients={setPatients} onSelect={(patient)=>setPatient(patient)} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <button className="flex flex-row justify-self-start my-10 mx-4 bg-interactive01 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none" onClick={()=>""}>Get</button>
      </div>
			{patientSelected  && (
        <div className="flex flex-col justify-center">
          <div className="flex flex-col items-center text-text01 text-2xl px-4 font-bold">Prescriptions for {patientSelected.name}</div>
          Fetched Prescriptions....
					{/* Iterate over fetchedPrescriptions and render prescription details */}
          {fetchedPrescriptions.map((prescription) => (
            <div key={prescription.id}>
              {/* Display prescription details (medication, dosage, etc.) */}
							Fetched Prescription....
            </div>
          ))}
					<button className="my-10 mx-4 bg-interactive01 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none" onClick={handleBack}>
						Back
					</button>
        </div>
      )}
      </div>
  )
}

export default PatientSearch