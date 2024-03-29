import LandingPage from "./Pages/Landing/LandingPage"
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import LoginPage from "./Pages/Login/LoginPage";
import HomePage from "./Pages/Home/HomePage";
import AddPatient from "./Pages/Home/AddPatient/AddPatient";
import AddConsultation from "./Pages/Home/AddConsulation/AddConsultation";
import DeletePatient from "./Pages/Home/DeletePatients/DeletePatient";
import CardSet from './Pages/Home/Components/CardSet'
import Navbar from "./Pages/Home/Components/Navbar";
import EditPatient from "./Pages/Home/EditPatient/EditPatient";
import ViewRecords from "./Pages/Home/ViewRecords/ViewRecords";
import ViewTransfers from "./Pages/Home/ViewTransfers/ViewTransfers";
import {RecoilRoot} from 'recoil';

const App = () => {
  return (
		<RecoilRoot>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/home" element={<HomePage />}>
					<Route path="addRecords" element={<AddPatient />} />
					<Route path="addConsultation" element={<AddConsultation />} />
					<Route path="deleteRecords" element={<DeletePatient />} />
					<Route path="editRecords" element={<EditPatient />} />
					<Route path="viewTransfers" element={<ViewTransfers />} />
					<Route path="viewRecords" element={<ViewRecords />} />
				</Route>
			</Routes>
		</BrowserRouter>
		</RecoilRoot>

   
  )
}

export default App