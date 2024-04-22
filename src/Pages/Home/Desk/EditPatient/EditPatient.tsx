import React,{useState} from 'react'
import Title from '../../Components/Title'
import EditForm from './Components/EditForm'
import SearchBar from './Components/SearchPatient'
import { Patient } from '../../../Types/Patient'
import { useNavigate } from 'react-router-dom'

const EditPatient = () => {
  const navigate=useNavigate();
  const [patientSelected,setPatient]=useState<Patient|undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [closeForm,setClose]=useState<Boolean>(true);
  const updateRecord = (updatedRecord: Patient) => {
		// Find the index of the edited record in the array
		const index = patients.findIndex(record => record.patientId === updatedRecord.patientId);
	
		if (index !== -1) {
			// Create a copy of the records array
			const updatedRecords = [...patients];
			// Replace the record at the found index with the updated record
			updatedRecords[index] = updatedRecord;
			// Set the state with the updated array
			setPatients(updatedRecords);
		} else {
			console.error("Record not found");
		}
	};
  return (
    <div className="flex flex-col justify-center items-center h-auto mt-20">
      <Title title='Edit Patient Details'></Title>
      <div className="flex flex-row">
        <SearchBar patients={patients} setPatients={setPatients} onSelect={(patient)=>setPatient(patient)} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <button className="flex flex-row justify-self-start my-10 mx-4 bg-interactive01 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none" onClick={()=>navigate("/home")}>Back</button>
      </div>
      {patientSelected && searchTerm && <EditForm patient={patientSelected} updateRecord={updateRecord} setClose={setClose} setSearchTerm={setSearchTerm}/>}
      </div>
  )
}

export default EditPatient