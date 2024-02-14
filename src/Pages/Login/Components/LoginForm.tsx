import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // Replace with your actual API call
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Handle successful login
      setError('');
      navigate('/landing'); // Navigate to landing page on success
    } else {
      // Handle login failure (e.g., display error message)
      setError('Invalid username or password. Please try again.');
    }
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
