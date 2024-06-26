import React, { useState } from 'react';
import PrintablePatientForm from './PrintablePatientForm';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilValue } from 'recoil';
import { authState } from '../../../../../auth/auth';

interface FormData {
  firstName: string;
  lastName: string;
  aabhaId: string;
  dob: Date; // Change the type to Date
  email: string;
  bloodGroup: string;
  gender: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  patientType: string;
  address: string;
  [key: string]: string | Date; // Add Date type to the index signature
}

interface FormErrors {
  [key: string]: string;
}

interface ApiFormData {
  name: string;
  aabhaId: string;
  emailId: string;
  dateOfBirth: string;
  bloodGroup: string;
  emergencyContactNumber: string;
  gender?: string;
  patientType: string;
}

const PatientForm: React.FC = () => {
  const navigate = useNavigate(); 
  const token=useRecoilValue(authState);
  const [openPrint,setPrint]=useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    aabhaId: "",
    dob: new Date("1/1/2000"), // Set initial date value
    email: "",
    gender: "",
    bloodGroup: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    patientType: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date) => {
    setFormData((prevData) => ({
      ...prevData,
      dob: date,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for mandatory fields
    const mandatoryFields = [
      "firstName",
      "lastName",
      "dob",
      "email",
      "emergencyContactName",
      "emergencyContactNumber",
    ];
    const newErrors: FormErrors = {};
    mandatoryFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is mandatory";
      }
    });
    setErrors(newErrors);
    // If there are no errors, proceed with the API call
    if (Object.keys(newErrors).length === 0) {
      try {
        // Format the data to match the required JSON format
        const apiFormData: ApiFormData = {
          name: `${formData.firstName} ${formData.lastName}`,
          aabhaId: formData.aabhaId,
          emailId: formData.email,
          bloodGroup: formData.bloodGroup,
          dateOfBirth: formData.dob.toISOString(), // Convert Date to string
          emergencyContactNumber: formData.emergencyContactNumber,
          gender: formData.gender,
          patientType: formData.patientType,
        };
        console.log(apiFormData);
        await fetch(`${process.env.REACT_APP_DB_URL}/patient/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(apiFormData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to post data');
          }
          console.log('Data posted successfully:', response.status);
          return response.text();
        }).then((responseText)=>{
          setPrint(true);
          console.log(responseText)
          alert(responseText)
        })

      } catch (error) {
        console.error("Error during API call:", error);
      }
    }
  };

  //@TODO: Implement your logic to navigate back
  const handleBack = () => {
    // Implement your logic to navigate back
    navigate("/home");
  };

  return (
    <>
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
          {errors.firstName && (
            <p className="text-danger02">{errors.firstName}</p>
          )}
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
          {errors.lastName && (
            <p className="text-danger02">{errors.lastName}</p>
          )}
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
          <label htmlFor="bloodGroup">Blood Group*</label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full p-2 border focus:border-interactive04"
          >
            <option value="">Select...</option>
            <option value="A_POSITIVE">A Positive</option>
            <option value="A_NEGATIVE">A Negative</option>
            <option value="B_POSITIVE">B Positive</option>
            <option value="B_NEGATIVE">B Negative</option>
            <option value="AB_POSITIVE">AB Positive</option>
            <option value="AB_NEGATIVE">AB Negative</option>
            <option value="O_POSITIVE">O Positive</option>
            <option value="O_NEGATIVE">O Negative</option>
          </select>
        </div>
        <div>
          <label htmlFor="dob">Date of Birth*</label>
          <div>
            <DatePicker
              id="dob"
              selected={formData.dob}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              yearDropdownItemNumber={15} // Adjust the number of years displayed in the dropdown
              scrollableYearDropdown
              className="w-full p-2 border focus:border-interactive04"
            />
          </div>
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
          {errors.emergencyContactName && (
            <p className="text-danger02">{errors.emergencyContactName}</p>
          )}
        </div>
        <div>
          <label htmlFor="emergencyContactNumber">
            Emergency Contact Number*
          </label>
          <input
            type="text"
            id="emergencyContactNumber"
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={handleChange}
            className="w-full p-2 border focus:border-interactive04"
          />
          {errors.emergencyContactNumber && (
            <p className="text-danger02">{errors.emergencyContactNumber}</p>
          )}
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
            <option value="INPATIENT">Indoor</option>
            <option value="OUTPATIENT">Outdoor</option>
          </select>
          {errors.patientType && (
            <p className="text-danger02">{errors.patientType}</p>
          )}
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border focus:border-interactive04">
              <option value="">Select...</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Others</option>
          </select>
        </div>
      </div>

      {/* Type and Submit button */}

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
    {openPrint && <PrintablePatientForm patient={formData} isOpen={openPrint} onClose={setPrint}/>}
    </>
  );
};

export default PatientForm;
