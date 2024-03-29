import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  patientId: string;
  doctorName: string;
  department: string;
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

const ConsultationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    patientId: '',
    doctorName: '',
    department: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for mandatory fields
    const mandatoryFields = ['patientId', 'department'];
    const newErrors: FormErrors = {};
    mandatoryFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is mandatory';
      }
    });
    setErrors(newErrors);

    // If there are no errors, proceed with the API call
    if (Object.keys(newErrors).length === 0) {
      // Dummy API call (replace with actual API endpoints)
      fetch('https://api.example.com/submitFormData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('API response:', data);
        })
        .catch((error) => {
          console.error('Error during API call:', error);
        });
    }
  };

  // Handler for the back button
  const handleBack = () => {
    // Implement your logic to navigate back
    navigate("/home");
  };

  return (
    <form className="w-auto mt-8 px-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-8 px-8">
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
        <div>
          <label htmlFor="doctorName">Doctor Name</label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            className="w-full p-2 border focus:border-interactive04"
          />
        </div>
        <div>
          <label htmlFor="department">Department*</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border"
          >
            <option value="">Select...</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Gynecology">Gynecology</option>
            {/* Add more department options as needed */}
          </select>
          {errors.department && <p className="text-danger02">{errors.department}</p>}
        </div>
      </div>

      <div className="mt-4 px-8 flex justify-center gap-8">
        <button type="submit" className="bg-interactive01 text-text04 px-16 py-2 rounded-lg hover:bg-hoverPrimary">
          Submit
        </button>
        <button className="bg-interactive01 text-text04 px-16 py-2 rounded-lg hover:bg-hoverPrimary" onClick={handleBack}>
          Back
        </button>
      </div>
    </form>
  );
};

export default ConsultationForm;
