export interface Doctor {
  employeeId: string;
  name: string;
  dateOfBirth: string;
  lastCheckIn: string;
  employeeStatus: "CHECKED_IN" | "CHECKED_OUT";
  employeeType: string;
  email: string;
}