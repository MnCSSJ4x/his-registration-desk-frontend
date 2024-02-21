import LandingPage from "./Pages/Landing/LandingPage"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./Pages/Login/LoginPage";
import HomePage from "./Pages/Home/HomePage";
import AddPatient from "./Pages/Home/AddPatient/AddPatient";
import AddConsultation from "./Pages/Home/AddConsulation/AddConsultation";
import DeletePatient from "./Pages/Home/DeletePatients/DeletePatient";


const App = () => {
  return (
  <BrowserRouter>
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/home" element={<HomePage />} />
			<Route path="/home/addRecords/*" element={<AddPatient/>} />
			<Route path="/home/addConsultation/*" element={<AddConsultation/>} />
			<Route path="/home/deletePatient/*" element={<DeletePatient/>} />
		</Routes>
	</BrowserRouter>
   
  )
}

export default App