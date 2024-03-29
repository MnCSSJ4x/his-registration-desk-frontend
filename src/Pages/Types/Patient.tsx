export interface Patient {
  patientId: string;
  name: string;
  aabhaId: string;
  aadharId: string;
  emailId: string;
  dateOfBirth: string; // Consider using a Date type if you need to perform date operations
  emergencyContactNumber: string;
  gender: "MALE" | "FEMALE" | "OTHER"; // Assuming gender can only be one of these values
  patientType: "INPATIENT" | "OUTPATIENT"; // Assuming patient type can only be one of these values
  dischargeStatus: null | string; // Assuming discharge status can either be null or a string

  getAge(): number;
}

export function getAge(dateOfBirth: string): number  {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
}