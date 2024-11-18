import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, register } from '../services/authService';  // Importing login and register functions from authService

// Create an AuthContext to provide authentication data and functions to other components
const AuthContext = createContext();

// The AuthProvider component wraps your app and provides authentication state and actions
export const AuthProvider = ({ children }) => {
  // State variables to manage authentication status and tokens
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks if the user is authenticated
  const [accessToken, setAccessToken] = useState(null);  // Stores the access token
  const [refreshToken, setRefreshToken] = useState(null);  // Stores the refresh token

  // Effect hook to check if tokens are stored in localStorage on component mount
  useEffect(() => {
    const savedAccessToken = localStorage.getItem('accessToken');
    const savedRefreshToken = localStorage.getItem('refreshToken');
    
    // If both tokens exist in localStorage, set them to state and mark as authenticated
    if (savedAccessToken && savedRefreshToken) {
      setAccessToken(savedAccessToken);
      setRefreshToken(savedRefreshToken);
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle user login
  const loginUser = async (username, password) => {
    try {
      // Call the login service to authenticate the user
      const data = await login(username, password);
      
      // If there is an error in the login response, return the error
      if (data.error) {
        return { error: data.error };
      }

      // Save the access and refresh tokens in localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // Set tokens to state and mark the user as authenticated
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error("Authentication error", error);  // Log any error during login
      return { error: "Error making login request" };  // Return a general error message
    }
  };

  // Function to handle user registration
  const registerUser = async (username, email, password) => {
    try {
      // Call the register service to create a new user
      const data = await register(username, email, password);

      // If there is an error in the registration response, return the error
      if (data.error) {
        return { error: data.error };
      }

      return { success: true }; // Return success if registration is successful
    } catch (error) {
      console.error("Registration error", error);  // Log any error during registration
      return { error: "Error making registration request" };  // Return a general error message
    }
  };

  // Function to handle user logout
  const logoutUser = () => {
    // Remove tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    // Reset the state variables to null or false
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
  };

  // The context provider makes the authentication state and functions available to the app
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated,  // Whether the user is logged in or not
      accessToken,      // The user's access token
      refreshToken,     // The user's refresh token
      loginUser,        // The function to log the user in
      registerUser,     // The function to register a new user
      logoutUser        // The function to log the user out
    }}>
      {children}  {/* Render the child components */}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access authentication data and actions in other components
export const useAuth = () => {
  return useContext(AuthContext);  // Use the context and return its value
};
