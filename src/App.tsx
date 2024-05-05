import LandingPage from "./Pages/Landing/LandingPage"
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import LoginPage from "./Pages/Login/LoginPage";
import HomePage from "./Pages/Home/HomePage";
import AddPatient from "./Pages/Home/Desk/AddPatient/AddPatient";
import AddConsultation from "./Pages/Home/Desk/AddConsulation/AddConsultation";
import DeletePatient from "./Pages/Home/Desk/DeletePatients/DeletePatient";
import CardSet from './Pages/Home/Components/CardSet'
import Navbar from "./Pages/Home/Components/Navbar";
import EditPatient from "./Pages/Home/Desk/EditPatient/EditPatient";
import ViewRecords from "./Pages/Home/Desk/ViewRecords/ViewRecords";
import ViewTransfers from "./Pages/Home/Desk/ViewTransfers/ViewTransfers";
import {RecoilRoot} from 'recoil';
import { useState } from "react";

const App = () => {
	const [role,setRole]=useState<string>("");
  return (
		<RecoilRoot>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<LoginPage role={role} setRole={setRole}/>} />
				<Route path="/home" element={<HomePage role={role} setRole={setRole}/>}>
					{role.includes("DESK") && <>
					<Route path="addRecords" element={<AddPatient />} />
					<Route path="addConsultation" element={<AddConsultation />} />
					<Route path="deleteRecords" element={<DeletePatient />} />
					<Route path="editRecords" element={<EditPatient />} />
					<Route path="viewTransfers" element={<ViewTransfers />} />
					<Route path="viewRecords" element={<ViewRecords />} />
					</>}
					{
						role.includes("PHARMACIST") &&
						<>
						<Route></Route>
						</>
					}
				</Route>
			</Routes>
		</BrowserRouter>
		</RecoilRoot>

   
  )
}

export default App