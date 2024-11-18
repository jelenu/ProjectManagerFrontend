import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';

const Register = ({ toggleAuthMode }) => {
  // State hooks to manage the form inputs and errors
  const [username, setUsername] = useState('');  // Stores the username input
  const [email, setEmail] = useState('');  // Stores the email input
  const [password, setPassword] = useState('');  // Stores the password input
  const [confirmPassword, setConfirmPassword] = useState('');  // Stores the confirm password input
  const [usernameError, setUsernameError] = useState(''); // Stores username error message
  const [emailError, setEmailError] = useState(''); // Stores email error message
  const [passwordError, setPasswordError] = useState(''); // Stores password error message
  const [confirmPasswordError, setConfirmPasswordError] = useState(''); // Stores confirm password error message
  const [generalError, setGeneralError] = useState(''); // Stores general error message
  const [message, setMessage] = useState('');  // Stores success or failure message
  const { registerUser } = useAuth(); // Retrieves the register function from auth context

  // Function to handle the registration process
  const handleRegister = async () => {
    // Clear any existing error messages
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setGeneralError('');
    setMessage('');

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return; // Exit the function if passwords do not match
    }

    try {
      // Attempt to register the user
      const result = await registerUser(username, email, password);
      console.log(result); // Log the result for debugging

      // If there's an error in the result, set the corresponding error messages
      if (result.error) {
        if (result.error.username) {
          setUsernameError(result.error.username[0]);
        }
        if (result.error.email) {
          setEmailError(result.error.email[0]);
        }
        if (result.error.password) {
          setPasswordError(result.error.password[0]);
        }
        if (result.error.confirmPassword) {
          setConfirmPasswordError(result.error.confirmPassword[0]);
        }
        if (result.error.detail) {
          setGeneralError(result.error.detail);
        }
      } else {
        // If registration is successful, display a success message
        setMessage(`User: ${result.username} created successfully`);
        setTimeout(() => {
          toggleAuthMode(); // After 2 seconds, switch to the login mode
        }, 2000);
      }
    } catch (error) {
      console.error('Registration failed', error); // Log any errors during registration
      setMessage('There was an issue with registration. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Account</h2>

        {/* Display success or error messages */}
        {message && (
          <div className="text-center mb-4 text-lg font-semibold text-green-500">
            {message}
          </div>
        )}
        {generalError && (
          <div className="text-center mb-4 text-lg font-semibold text-red-500">
            {generalError}
          </div>
        )}

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

        {/* Email input field */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Update email state on change
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* Display email error message if there is any */}
          {emailError && (
            <p className="mt-1 text-red-500 text-sm">{emailError}</p>
          )}
        </div>

        {/* Password input field */}
        <div className="mb-4">
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

        {/* Confirm Password input field */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}  // Update confirmPassword state on change
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* Display confirm password error message if there is any */}
          {confirmPasswordError && (
            <p className="mt-1 text-red-500 text-sm">{confirmPasswordError}</p>
          )}
        </div>

        {/* Register button */}
        <button
          onClick={handleRegister}  // Trigger the registration process on click
          className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Create Account
        </button>

        {/* Toggle to login page if user already has an account */}
        <button
          onClick={toggleAuthMode}  // Switch to the login mode on click
          className="w-full p-3 mt-4 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Already registered?
        </button>
      </div>
    </div>
  );
};

export default Register;
