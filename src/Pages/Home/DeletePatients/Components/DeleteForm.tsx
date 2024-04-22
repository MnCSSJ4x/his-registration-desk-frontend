import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../../../../auth/auth';
import { Patient } from '../../../Types/Patient';

interface FormData {
  patientId: string;
  isDeleteConfirmed: boolean | null;
  patient: Patient | null
}

interface FormErrors {
  patientId: string;
  isDeleteConfirmed: string;
}

const DeleteForm: React.FC = () => {
  const token=useRecoilValue(authState)
  const navigate = useNavigate();
  const [isOpen,setOpen]=useState(false);
  const [formData, setFormData] = useState<FormData>({
    patientId: '',
    isDeleteConfirmed: null,
    patient: null
  });

  const [errors, setErrors] = useState<FormErrors>({
    patientId: '',
    isDeleteConfirmed: '',
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
          'Authorization': `Bearer ${token}`
        }
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
    navigate("/home");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === 'yes',
    });
    setErrors({
      ...errors,
      isDeleteConfirmed: value === 'no' ? 'Please confirm by selecting "Yes".' : '',
    });
  };

  const handleSelectPatient = (selectedPatient: Patient) => {

    setFormData({
      ...formData,
      patientId: selectedPatient.patientId,
      patient: selectedPatient
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {
      patientId: '',
      isDeleteConfirmed: '',
    };

    if (!formData.patientId) {
      newErrors.patientId = 'Patient ID is mandatory';
    }

    if (formData.isDeleteConfirmed === null) {
      newErrors.isDeleteConfirmed = 'Please confirm by selecting "Yes" or "No".';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      if (formData.isDeleteConfirmed !== null) {
        // Proceed with deletion
        fetch(`${process.env.REACT_APP_DB_URL}/patient/${formData.patientId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Failed to delete patient');
          })
          .then((data) => {
            alert('Patient deleted successfully.');
            navigate("/home");
          })
          .catch((error) => {
            console.error('Error deleting patient:', error);
            alert('Failed to delete patient. Please try again.');
          });
      }
    }
  };

  useEffect(() => {
    // Filter patients based on the search term
    setFilteredPatients(patients.filter(patient =>
      patient.name.toLowerCase().includes(formData.patientId.toLowerCase())
    ));
  }, [formData.patientId, patients]);

  return (
    <form className="w-auto mt-8 px-8" onSubmit={handleSubmit}>
      <div className="mt-4">
        <label>Search and select a patient:</label>
        <input
          type="text"
          placeholder="Search patients..."
          value={formData.patientId}
          onChange={handleChange}
          onFocus={()=>setOpen(true)}
          className="w-full p-2 border focus:border-interactive04"
        />
        {filteredPatients.length > 0 && isOpen &&
          <div className="absolute w-1/4 bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10 overflow-auto h-1/4">
            {filteredPatients.map(patient => (
              <div
                key={patient.patientId}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  handleSelectPatient(patient);
                  setOpen(false);
                }}
              >
                {patient.name+"-"+patient.patientId}
              </div>
            ))}
          </div>
        }
      </div>
      <div className="mt-4">
        <label>Do you want to delete the record? This action is irreversible.</label>
        <div className="flex mt-2 gap-2">
          <label className="mr-2">
            <input
              type="radio"
              name="isDeleteConfirmed"
              value="yes"
              checked={formData.isDeleteConfirmed === true}
              onChange={handleRadioChange}
              className='form-radio accent-interactive01 hover:accent-hoverPrimary'
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="isDeleteConfirmed"
              value="no"
              checked={formData.isDeleteConfirmed === false}
              onChange={handleRadioChange}
              className='form-radio accent-interactive01 hover:accent-hoverPrimary'
            />
            No
          </label>
        </div>
        {errors.isDeleteConfirmed && <p className="text-danger02">{errors.isDeleteConfirmed}</p>}
      </div>
      <div className="mt-4 px-8 flex justify-center gap-8">
        <button type="submit" className="bg-interactive01 text-text04 px-16 py-2 rounded-lg hover:bg-hoverPrimary">
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
  );
};

export default DeleteForm;
