import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  patientId: string;
  fields: { fieldName: string; value: string }[];
}

interface FormErrors {
  patientId: string;
  fields: { fieldName: string; value: string }[];
}

const EditForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    patientId: '',
    fields: [{ fieldName: '', value: '' }],
  });

  const [errors, setErrors] = useState<FormErrors>({
    patientId: '',
    fields: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedFields = [...prevData.fields];
      updatedFields[index] = { ...updatedFields[index], [name]: value };
      return { ...prevData, fields: updatedFields };
    });
  };

  const handleAddField = () => {
    setFormData((prevData) => ({
      ...prevData,
      fields: [...prevData.fields, { fieldName: '', value: '' }],
    }));
  };

  const handleRemoveField = (index: number) => {
    setFormData((prevData) => {
      const updatedFields = [...prevData.fields];
      updatedFields.splice(index, 1);
      return { ...prevData, fields: updatedFields };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for mandatory fields
    const newErrors: FormErrors = {
      patientId: '',
      fields: [],
    };

    if (!formData.patientId) {
      newErrors.patientId = 'Patient ID is mandatory';
    }

    formData.fields.forEach((field, index) => {
      if (!field.fieldName || !field.value) {
        newErrors.fields[index] = {
          fieldName: 'Field name is mandatory',
          value: 'Value is mandatory',
        };
      }
    });

    setErrors(newErrors);

    // If there are no errors, proceed with the API call
    if (Object.values(newErrors).every((error) => !error) && formData.fields.length > 0) {
      // Dummy API call (replace with actual API endpoints)
      fetch('https://api.example.com/submitEditData', {
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
    navigate("/home");
  };

  return (
    <form className="w-full mt-8 px-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="patientId">Patient ID*</label>
        <input
          type="text"
          id="patientId"
          name="patientId"
          value={formData.patientId}
          onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
          className="w-full p-2 border focus:border-interactive04"
        />
        {errors.patientId && <p className="text-red-500">{errors.patientId}</p>}
      </div>

      {formData.fields.map((field, index) => (
        <div key={index} className="flex flex-cols gap-4">
          <div>
            <label htmlFor={`fieldName-${index}`}>Field to Edit*</label>
            <select
              id={`fieldName-${index}`}
              name="fieldName"
              value={field.fieldName}
              onChange={(e) => handleChange(e, index)}
              className="w-full p-2 border"
            >
              <option value="">Select...</option>
              <option value="aabhaId">AABHA ID</option>
              <option value="aadharId">AADHAR ID</option>
              <option value="dob">Date of Birth</option>
              <option value="email">Email ID</option>
              <option value="emergencyContactName">Emergency Contact Name</option>
              <option value="emergencyContactNumber">Emergency Contact Number</option>
              <option value="patientType">Patient Type</option>
              <option value="address">Address</option>
            </select>
            {errors.fields[index] && errors.fields[index].fieldName && (
              <p className="text-red-500">{errors.fields[index].fieldName}</p>
            )}
          </div>
          <div>
            <label htmlFor={`value-${index}`}>Value*</label>
            <input
              type="text"
              id={`value-${index}`}
              name="value"
              value={field.value}
              onChange={(e) => handleChange(e, index)}
              className="w-full p-2 border focus:border-interactive04"
            />
            {errors.fields[index] && errors.fields[index].value && (
              <p className="text-red-500">{errors.fields[index].value}</p>
            )}
          </div>
          <div className='py-6'>
          <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className="bg-danger01 text-white p-2 rounded"
            >
              Remove
            </button>
          </div>
          
        </div>
      ))}

      

      <div className="mt-4 px-8 flex justify-center gap-8">
     
        <button type="button" onClick={handleAddField} className="bg-inverseSupport02 text-text04 px-16 py-2 rounded-lg hover:bg-support02">
          Add Field
        </button>
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

export default EditForm;
