import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';

const Login = ({ toggleAuthMode }) => {
  // State hooks to manage username, password, and errors
  const [username, setUsername] = useState('');  // Stores the username input
  const [password, setPassword] = useState('');  // Stores the password input
  const [usernameError, setUsernameError] = useState(''); // Stores username error message
  const [passwordError, setPasswordError] = useState(''); // Stores password error message
  const [generalError, setGeneralError] = useState(''); // Stores general error message
  const { loginUser } = useAuth(); // Retrieves the login function from the auth context

  // Function to handle the login process
  const handleLogin = async () => {
    // Clear any existing errors before attempting to log in
    setUsernameError(''); 
    setPasswordError('');
    setGeneralError(''); 

    // Attempt to log in with provided username and password
    const result = await loginUser(username, password);

    // If there's an error, update the respective error states
    if (result.error) {
      // Check if there's a username error and set the error message
      if (result.error.username) {
        setUsernameError(result.error.username[0]);
      }
      // Check if there's a password error and set the error message
      if (result.error.password) {
        setPasswordError(result.error.password[0]);
      }
      // If there's a general error, set it
      if (result.error.detail) {
        setGeneralError(result.error.detail);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Log in</h2>
        
        {/* Username input field */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}  // Update username state on change
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* Display username error message if there is any */}
          {usernameError && (
            <p className="mt-1 text-red-500 text-sm">{usernameError}</p>
          )}
        </div>
        
        {/* Password input field */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Update password state on change
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* Display password error message if there is any */}
          {passwordError && (
            <p className="mt-1 text-red-500 text-sm">{passwordError}</p>
          )}
        </div>

        {/* Display general error message if there is any */}
        {generalError && (
          <p className="my-4 text-red-500 text-sm text-center">{generalError}</p>
        )}

        {/* Login button */}
        <button
          onClick={handleLogin}  // Trigger the login process on click
          className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Log in
        </button>
        
        {/* Toggle to sign-up page */}
        <button
          onClick={toggleAuthMode}  // Switch to the sign-up mode on click
          className="w-full p-3 mt-4 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
