import LandingPage from "./Pages/Landing/LandingPage"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./Pages/Login/LoginPage";

const App = () => {
  return (
  <BrowserRouter>
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	</BrowserRouter>
   
  )
}

export default App