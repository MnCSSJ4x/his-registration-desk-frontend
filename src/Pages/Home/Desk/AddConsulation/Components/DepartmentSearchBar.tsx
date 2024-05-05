import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../../../../../auth/auth';

interface Department {
  departmentId: string;
  departmentName: string;
  departmentHead: string;
  noOfDoctors: number;
  noOfNurses: number;
}

interface DepartmentSearchBarProps {
  onSelectDepartment: (department: string) => void;
}

const DepartmentSearchBar: React.FC<DepartmentSearchBarProps> = ({ onSelectDepartment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isOpen, setOpen] = useState<Boolean>(false);
  const token = useRecoilValue(authState);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    fetch(`${process.env.REACT_APP_DB_URL}/department`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch department records');
      }
    })
    .then(data => {
      console.log(data);
      setDepartments(data);
    })
    .catch(error => {
      console.log(error.message);
    });
  };

  const handleSelectDepartment = (department: Department) => {
    onSelectDepartment(department.departmentId);
    setSearchTerm(department.departmentName);
    setOpen(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search departments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={() => setOpen(true)}
        className="w-full p-2 border focus:border-interactive04 rounded-xl"
      />
      {departments.length > 0 && isOpen && (
        <div className="absolute w-1/4 bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10 h-1/4 overflow-auto">
          {departments.map((department) => (
            <div
              key={department.departmentId}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectDepartment(department)}
            >
              {department.departmentName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentSearchBar;
