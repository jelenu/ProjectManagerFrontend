// Base URL for the API
const API_URL = "http://192.168.1.14:8000";

// Function to handle user login
export const login = async (username, password) => {
  try {
    // Send a POST request to the login endpoint with username and password in the body
    const response = await fetch(`${API_URL}/auth/token/`, {
      method: "POST",  // HTTP method is POST
      headers: {
        "Content-Type": "application/json",  // Specify the content type as JSON
      },
      body: JSON.stringify({ username, password }),  // Send username and password as JSON
    });

    // If the response is not OK, handle the error and return it
    if (!response.ok) {
      const error = await response.json();  // Parse the error response
      return { error: error || "Authentication error" };  // Return the error message
    }

    // Parse the response if the request is successful
    const data = await response.json();
    return {
      accessToken: data.accessToken,  // Return the access token from the response
      refreshToken: data.refreshToken,  // Return the refresh token from the response
    };
  } catch (error) {
    // Catch any network or other errors
    console.error("Error making login request:", error);
    return { error: "Error making login request" };  // Return a generic error message
  }
};

// Function to handle user registration
export const register = async (username, email, password) => {
  try {
    // Send a POST request to the registration endpoint with username, email, and password in the body
    const response = await fetch(`${API_URL}/auth/users/`, {
      method: "POST",  // HTTP method is POST
      headers: {
        "Content-Type": "application/json",  // Specify the content type as JSON
      },
      body: JSON.stringify({
        username,  // Send the username in the request body
        email,     // Send the email in the request body
        password,  // Send the password in the request body
      }),
    });

    // If the response is not OK, handle the error and return it
    if (!response.ok) {
      const error = await response.json();  // Parse the error response
      return { error: error || "Registration error" };  // Return the error message
    }

    // Parse the response if the request is successful
    const data = await response.json();
    return data;  // Return the user data (likely confirmation or user details)
  } catch (error) {
    // Catch any network or other errors
    console.error("Error making registration request:", error);
    return { error: "Error making registration request" };  // Return a generic error message
  }
};
