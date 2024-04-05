import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../../../../auth/auth';
import { Patient } from '../../../Types/Patient';

interface FormData {
  patientId: string;
  from: string;
  to: string;
  patient: Patient | null;
}


const TransferForm: React.FC = () => {
  const navigate = useNavigate();
  const token = useRecoilValue(authState);
  const [formData, setFormData] = useState<FormData>({
    patientId: '',
    from: '',
    to: '',
    patient: null,
  });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DB_URL}/patient`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  const handleSelectPatient = (selectedPatient: Patient) => {
    setFormData({
      ...formData,
      patientId: selectedPatient.patientId,
      patient: selectedPatient,
      from: selectedPatient.patientType,
      to: selectedPatient.patientType==="INPATIENT"?"OUTPATIENT":"INPATIENT"
    });
  };
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      // Proceed with the transfer
      console.log(formData)
      fetch(`${process.env.REACT_APP_DB_URL}/patient/transfer/${formData.patient?.patientId}?newPatientType=${formData.to}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API response:', data);
        // Proceed with the transfer
        console.log('Transfer form data:', formData);
        // Reset form data after submission
        setFormData({
          patientId: '',
          from: '',
          to: '',
          patient: null,
        });
        updateRecord(data);
        alert("Patient Tranfered.")
      })
      .catch((error) => {
        console.error('Error during API call:', error);
        alert("error occured: "+ error)
      });
  };

  useEffect(() => {
    // Filter patients based on the search term
    setFilteredPatients(
      patients.filter((patient) =>
        patient.name.toLowerCase().includes(formData.patientId.toLowerCase())
      )
    );
  }, [formData.patientId, patients]);

  return (
    <div>
      <div className="mt-4">
        <label>Search and select a patient:</label>
        <input
          type="text"
          placeholder="Search patients..."
          value={formData.patientId}
          onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
          className="w-full p-2 border focus:border-interactive04"
        />
        {filteredPatients.length > 0 &&
          <div className="absolute w-1/4 bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10">
            {filteredPatients.map(patient => (
              <div
                key={patient.patientId}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectPatient(patient)}
              >
                {patient.name + "-" + patient.patientId}
              </div>
            ))}
          </div>
        }
      </div>
      <form className="w-full mt-8 px-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="patientId">Patient ID*</label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              readOnly
              className="w-full p-2 border focus:border-interactive04"
            />
          </div>
          <div>
            <label htmlFor="from">From*</label>
            <input
              type="text"
              id="from"
              name="from"
              value={formData.patient?.patientType}
              onChange={(e) => setFormData({ ...formData, from: e.target.value })}
              className="w-full p-2 border focus:border-interactive04"
              disabled
            />
          </div>
          <div>
            <label htmlFor="to">To*</label>
            <select
              id="to"
              name="to"
              value={formData.patient?.patientType==="INPATIENT"?"OUTPATIENT":"INPATIENT"}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="w-full p-2 border focus:border-interactive04"
              disabled
            >
              <option value="">Select...</option>
              <option value="INPATIENT">INPATIENT</option>
              <option value="OUTPATIENT">OUTPATIENT</option>
            </select>
          </div>
        </div>
        <div className="mt-4 px-8 flex justify-center gap-8">
          <button
            type="submit"
            className="bg-interactive01 text-text04 px-16 py-2 rounded-lg hover:bg-hoverPrimary"
          >
            Submit
          </button>
          <button
            className="bg-interactive01 text-text04 px-16 py-2 rounded-lg hover:bg-hoverPrimary"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransferForm;
