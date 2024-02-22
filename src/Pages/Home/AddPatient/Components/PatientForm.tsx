import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  aabhaId: string;
  aadharId: string;
  dob: string;
  email: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  patientType: string;
  address: string;
  [key: string]: string; // Add index signature
}

interface FormErrors {
  [key: string]: string;
}

const PatientForm: React.FC = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    aabhaId: '',
    aadharId: '',
    dob: '',
    email: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    patientType: '',
    address: '',
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
    const mandatoryFields = ['firstName', 'lastName', 'dob', 'email', 'emergencyContactName', 'emergencyContactNumber'];
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

  //@TODO: Implement your logic to navigate back
  const handleBack = () => {
    // Implement your logic to navigate back
    navigate(-1); 
  };

  return (
    <form className="w-auto mt-8 px-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-8 px-8">
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border focus:border-interactive04"
          />
          {errors.firstName && <p className="text-danger02">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border focus:border-interactive04"
          />
          {errors.lastName && <p className="text-danger02">{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="aabhaId">AABHA ID</label>
          <input
            type="text"
            id="aabhaId"
            name="aabhaId"
            value={formData.aabhaId}
            onChange={handleChange}
            className="w-full p-2 border focus:border-interactive04"
          />
        </div>
        <div>
          <label htmlFor="aadharId">AADHAR ID</label>
          <input
            type="text"
            id="aadharId"
            name="aadharId"
            value={formData.aadharId}
            onChange={handleChange}
            className="w-full p-2 border focus:border-interactive04"
          />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth*</label>
          <input
            type="text"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 border focus:border-interactive04"
          />
          {errors.dob && <p className="text-danger02">{errors.dob}</p>}
        </div>
        <div>
          <label htmlFor="email">Email ID*</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border focus:border-interactive04"
          />
          {errors.email && <p className="text-danger02">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="emergencyContactName">Emergency Contact Name*</label>
          <input
            type="text"
            id="emergencyContactName"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            className="w-full p-2 border focus:border-interactive04"
          />
          {errors.emergencyContactName && <p className="text-danger02">{errors.emergencyContactName}</p>}
        </div>
        <div>
          <label htmlFor="emergencyContactNumber">Emergency Contact Number*</label>
          <input
            type="text"
            id="emergencyContactNumber"
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={handleChange}
            className="w-full p-2 border focus:border-interactive04"
          />
          {errors.emergencyContactNumber && <p className="text-danger02">{errors.emergencyContactNumber}</p>}
        </div>
        <div>
          <label htmlFor="address">Address*</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border focus:border-interactive04"
          />
          {errors.address && <p className="text-danger02">{errors.address}</p>}
        </div>
        <div>
          <label htmlFor="patientType">Patient Type*</label>
            <select
                id="patientType"
                name="patientType"
                value={formData.patientType}
                onChange={handleChange}
                className="w-full p-2 border"
              >
                <option value="">Select...</option>
                <option value="indoor">Indoor</option>
                <option value="outdoor">Outdoor</option>
              </select>
              {errors.patientType && <p className="text-danger02">{errors.patientType}</p>}
        </div>
        
      </div>


      {/* Type and Submit button */}
      
        

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

export default PatientForm;
