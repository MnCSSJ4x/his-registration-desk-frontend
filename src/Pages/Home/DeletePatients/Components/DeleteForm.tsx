import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface FormData {
  patientId: string;
  isDeleteConfirmed: boolean | null;
}

interface FormErrors {
  patientId: string;
  isDeleteConfirmed: string;
}

const DeleteForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    patientId: '',
    isDeleteConfirmed: null,
  });

  const [errors, setErrors] = useState<FormErrors>({
    patientId: '',
    isDeleteConfirmed: '',
  });
  const handleBack = () => {
    // Implement your logic to navigate back
    navigate(-1);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for mandatory fields
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

    // If there are no errors, proceed with the API call
    if (Object.values(newErrors).every((error) => !error)) {
      // Dummy API call to validate the radio button selection
      if (formData.isDeleteConfirmed !== null) {
        // Dummy API call (replace with actual API endpoints)
        fetch('https://api.example.com/submitDeleteRequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            patientId: formData.patientId,
            isDeleteConfirmed: formData.isDeleteConfirmed,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Display toast based on API response
            if (data.success) {
              alert('Delete request successful. Display a success toast.');
            } else {
              alert('Delete request failed. Display a failure toast.');
            }
          })
          .catch((error) => {
            console.error('Error during API call:', error);
            alert('Error during API call. Display a failure toast.');
          });
      }
    }
  };

  return (
    <form className="w-auto mt-8 px-8" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="patientId">Patient ID*</label>
        <input
          type="text"
          id="patientId"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          className="w-full p-2 border focus:border-interactive04"
        />
        {errors.patientId && <p className="text-danger02">{errors.patientId}</p>}
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
