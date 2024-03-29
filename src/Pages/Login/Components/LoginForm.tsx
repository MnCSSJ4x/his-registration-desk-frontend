import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authState } from "../../../auth/auth";
import { useRecoilState } from "recoil";
const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    const jsonData={"uuid": username, "password": password}
    // Replace with your actual API call
    const response = await fetch(`${process.env.REACT_APP_AUTHENTICATION_URL}/api/v1/auth/authenticate`, {
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json' // Set the Content-Type header
      }
    }).then(response => {
      if (response.ok) {
        return response.json(); // Return the promise for the parsed JSON data
      } else {
        // Handle login failure directly within the first .then
        throw new Error('Invalid username or password. Please try again.');
      }
    })
    .then((data) => {
      // Handle successful login
      console.log(data)
      setAuth(data);
      setError('');
      navigate('/home'); // Navigate to landing page on success
    })
    .catch((error) => {
      // Handle any errors (network issues, parsing errors, etc.)
      setError(error.message);
    });
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Navigate to forgot password page
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center py-48">
      <h1 className="text-6xl font-bold mb-8">Login</h1>
      {error && <p className="text-danger02 mb-4">{error}</p>}
      <div className="flex flex-col w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 rounded-md border border-ui04 focus:ring-2 focus:ring-interactive04 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-md border border-ui04 focus:ring-2 focus:ring-interactive04 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-interactive01 hover:bg-hoverPrimary text-white font-bold py-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Login
        </button>
        <a href="#" onClick={handleForgotPassword} className="hover:text-hoverPrimaryText text-sm text-gray-600">
          Forgot Password?
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
