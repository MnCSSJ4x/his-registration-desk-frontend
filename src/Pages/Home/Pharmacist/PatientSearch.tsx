import React,{useEffect, useState} from 'react'
import Title from '../Components/Title'
import SearchBar from '../Desk/EditPatient/Components/SearchPatient'
import { Patient } from '../../Types/Patient'
import { useRecoilValue } from 'recoil'
import { authState } from '../../../auth/auth'
import axios from 'axios'

interface FileImageMap {
    [key: string]: string;
}

const PatientSearch = () => {
  const token=useRecoilValue(authState)
  const [searchTerm, setSearchTerm] = useState<string>('');
	const [fetchedPrescriptions, setFetchedPrescriptions] = useState<any[]>([]);
	const handleBack = () => {
    setSearchTerm('');
    setFetchedPrescriptions([]); // Clear fetched prescriptions
  };

  const fetchPrescriptions = async () => {
    console.log(`${process.env.REACT_APP_DB2_URL}/emr/getPrescriptionByEmrIdText/${searchTerm}`,token)
      const response = await axios.get(`${process.env.REACT_APP_DB2_URL}/emr/getPrescriptionByEmrIdText/${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      if(response.status===200){
        if(Object.keys(response.data).length === 0 && response.data.constructor === Object){
          setFetchedPrescriptions(["No Prescription!"]);
        }
        // setPatients(response.data);
      }
      else{
        alert("Error fetching patients!")
      }
  };

  return (
    <div className="flex flex-col justify-center items-center h-auto mt-20">
      <Title title='View Prescriptions'></Title>
      <div className="flex flex-row mt-8">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-gray-200 text-gray-800 rounded-full px-4 h-10 focus:outline-none focus:bg-gray"
      />
        <button className="justify-self-start bg-interactive01 text-white ml-2 py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none" onClick={()=>fetchPrescriptions()}>Get</button>
      </div>
			{fetchedPrescriptions.length>=1  && (
        <div className="flex flex-col justify-center mt-8">
          <div className="flex flex-col items-center text-text01 text-2xl px-4 font-bold">Prescriptions for {searchTerm}</div>
          Fetched Prescriptions...
          {fetchedPrescriptions.length===1 && <div> {fetchedPrescriptions[0]}</div>}
          {Object.entries(fetchedPrescriptions).map(([key, value]) => (
                <div key={key}>
                    <p>{key}</p>
                    <img src={`data:image/jpeg;base64, ${value}`} alt={key} />
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