import React, { useEffect, useState } from "react";
import Title from "../Components/Title";
import SearchBar from "../Desk/EditPatient/Components/SearchPatient";
import { Patient } from "../../Types/Patient";
import { useRecoilValue } from "recoil";
import { authState } from "../../../auth/auth";
import axios from "axios";

interface ResponseInterface {
  image: string | null;
  timestamp: string;
  text: string | null;
}

const PatientSearch = () => {
  const token = useRecoilValue(authState);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [fetchedPrescriptions, setFetchedPrescriptions] = useState<
    ResponseInterface[]
  >([]);
  const handleBack = () => {
    setSearchTerm("");
    setFetchedPrescriptions([]); // Clear fetched prescriptions
  };

  const fetchPrescriptions = async () => {
    console.log(
      `${process.env.REACT_APP_DB2_URL}/emr/getPrescriptionByEmrIdText/${searchTerm}`,
      token
    );
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DB2_URL}/emr/getPrescriptionByEmrIdText/${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.Prescriptions);
      if (response.status === 200) {
        setFetchedPrescriptions(response.data.Prescriptions);
        // setPatients(response.data);
      } else {
        alert("Error fetching patients!");
      }
    } catch (error) {
      console.log(error);
      alert("Couldn't find emr!");
    }
  };
  console.log(fetchedPrescriptions);
  return (
    <div className="flex flex-col justify-center items-center h-auto mt-20">
      <Title title="View Prescriptions"></Title>
      <div className="flex flex-row mt-8">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-200 text-gray-800 rounded-full px-4 h-10 focus:outline-none focus:bg-gray"
        />
        <button
          className="justify-self-start bg-interactive01 text-white ml-2 py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
          onClick={() => fetchPrescriptions()}
        >
          Get
        </button>
      </div>
      {fetchedPrescriptions.length > 0 && (
        <div className="flex flex-col justify-center mt-8">
          <div className="flex flex-col items-center text-text01 text-2xl px-4 font-bold">
            Prescriptions for {searchTerm}
          </div>
          <div className="flex flex-col m-4 items-center">
            Fetched Prescriptions...
            {fetchedPrescriptions.map((prescription, index) => (
              <div
                key={index}
                className="flex flex-row ms-4 items-center w-1/2"
              >
                {index + 1}.
                {Object.entries(prescription).map(([key, value]) => (
                  <div key={key} className="ms-2 justify-self-center">
                    {key === "timestamp" && `${key}: ${value}`}
                    {key === "image" && value && (
                      <img
                        src={`data:image/jpeg;base64, ${value}`}
                        alt={key}
                        width="auto"
                        height="auto"
                      />
                    )}
                    {key === "text" && value && `${key}: ${value}`}
                  </div>
                ))}
              </div>
            ))}
            <button
              className="my-10 mx-4 bg-interactive01 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientSearch;
