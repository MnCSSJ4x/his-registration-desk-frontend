import React, { useState } from 'react';
import { Patient } from '../../../Types/Patient';

interface Props {
  options: Patient[];
  onSelect: (selectedItem: Patient) => void;
}

const Dropdown: React.FC<Props> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSelectOption = (option: Patient) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        className="bg-gray-200 text-gray-800 rounded-full py-2 px-4 focus:outline-none focus:bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        Select a patient...
        <svg
          className={`absolute right-3 top-3 h-5 w-5 text-gray-500 transition-transform transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.293 13.707a1 1 0 01-1.414 1.414l-3-3a1 1 0 111.414-1.414l3 3zM11 15a4 4 0 100-8 4 4 0 000 8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-md">
          {options.map((option) => (
            <div
              key={option.patientId}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => handleSelectOption(option)}
            >
              {option.name} - {option.patientId}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
