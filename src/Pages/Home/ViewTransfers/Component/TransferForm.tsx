import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  patientId: string;
  from: string;
  to: string;
}

interface FormErrors {
  patientId: string;
  from: string;
  to: string;
}

const TransferForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    patientId: '',
    from: '',
    to: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    patientId: '',
    from: '',
    to: '',
  });

  const [debouncedPatientId, setDebouncedPatientId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedPatientId(formData.patientId);
    }, 300);

    return () => clearTimeout(delay);
  }, [formData.patientId]);

  useEffect(() => {
    if (debouncedPatientId) {
      // Dummy API call to get patient details (replace with actual API endpoints)
      setLoading(true);
      fetch(`https://api.example.com/getPatientDetails?patientId=${debouncedPatientId}`)
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          // Update the 'from' field based on the response from the backend
          setFormData((prevData) => ({ ...prevData, from: data.inpatient ? 'inpatient' : 'outpatient' }));
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error fetching patient details:', error);
        });
    }
  }, [debouncedPatientId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for mandatory fields
    const newErrors: FormErrors = {
      patientId: '',
      from: '',
      to: '',
    };

    if (!formData.patientId) {
      newErrors.patientId = 'Patient ID is mandatory';
    }

    if (!formData.from) {
      newErrors.from = 'From field is mandatory';
    }

    if (!formData.to) {
      newErrors.to = 'To field is mandatory';
    }

    setErrors(newErrors);

    // If there are no errors, proceed with the API call
    if (Object.values(newErrors).every((error) => !error)) {
      // Dummy API call (replace with actual API endpoints)
      fetch('https://api.example.com/submitTransferData', {
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
    <form className="w-full mt-8 px-4">
      <div className="grid grid-cols-2 gap-4">
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
          {errors.patientId && <p className="text-red-500">{errors.patientId}</p>}
        </div>
        <div>
          <label htmlFor="from">From*</label>
          <input
            type="text"
            id="from"
            name="from"
            value={formData.from}
            readOnly
            className="w-full p-2 border focus:border-interactive04"
          />
          {errors.from && <p className="text-red-500">{errors.from}</p>}
        </div>
        <div>
          <label htmlFor="to">To*</label>
          <select
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="w-full p-2 border"
          >
            <option value="">Select...</option>
            {formData.from === 'inpatient' ? (
              <option value="outpatient">Outpatient</option>
            ) : formData.from === 'outpatient' ? (
              <option value="inpatient">Inpatient</option>
            ) : null}
          </select>
          {errors.to && <p className="text-red-500">{errors.to}</p>}
        </div>
      </div>

      {/* Type and Submit button */}
      <div className="mt-4 px-8 flex justify-center gap-8">
        <button
          type="submit"
          className="bg-interactive01 text-text04 px-16 py-2 rounded-lg hover:bg-hoverPrimary"
          onClick={handleSubmit}
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
  );
};

export default TransferForm;
