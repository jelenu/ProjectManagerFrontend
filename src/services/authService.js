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
      body: JSON.stringify({ username, password }),  // Convert username and password to JSON and send in the request body
    });

    // If the response status is not OK (not 2xx), parse the error and return it
    if (!response.ok) {
      const error = await response.json();  // Parse the error response body
      return { error: error || "Authentication error" };  // Return the error or a default message
    }

    // If the response is OK, parse the response body as JSON
    const data = await response.json();
    return {
      accessToken: data.access,  // Extract and return the access token from the response
      refreshToken: data.refresh,  // Extract and return the refresh token from the response
    };
  } catch (error) {
    // Catch and log any network or other errors
    console.error("Error making login request:", error);
    return { error: "Error making login request" };  // Return a general error message
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
        username,  // Include the username in the request body
        email,     // Include the email in the request body
        password,  // Include the password in the request body
      }),
    });

    // If the response status is not OK (not 2xx), parse the error and return it
    if (!response.ok) {
      const error = await response.json();  // Parse the error response body
      return { error: error || "Registration error" };  // Return the error or a default message
    }

    // If the response is OK, parse the response body as JSON
    const data = await response.json();
    return data;  // Return the parsed response (likely user data or confirmation)
  } catch (error) {
    // Catch and log any network or other errors
    console.error("Error making registration request:", error);
    return { error: "Error making registration request" };  // Return a general error message
  }
};

// Function to verify if an access token is valid
export const tokenVerify = async (accessToken) => {
  // If no access token is provided, log an error and return false
  if (!accessToken) {
    console.error("Access token is not valid.");
    return false;
  }

  try {
    // Send a POST request to the token verification endpoint with the token in the body
    const response = await fetch(`${API_URL}/auth/token/verify/`, {
      method: "POST",  // HTTP method is POST
      headers: {
        "Content-Type": "application/json",  // Specify the content type as JSON
      },
      body: JSON.stringify({
        token: accessToken,  // Include the access token in the request body
      }),
    });

    // If the response status is 200, the token is valid
    if (response.status === 200) {
      console.log("Token successfully verified.");
      return true;
    } else if (response.status === 401) {
      // If the response status is 401, the token is invalid or expired
      console.error("Token is invalid or expired.");
      return false;
    } else {
      // Log any other unexpected response statuses
      console.error(`Unknown error: ${response.status}`);
      return false;
    }
  } catch (error) {
    // Catch and log any network or other errors
    console.error("Error verifying token:", error);
    return false;  // Return false in case of any error
  }
};

// Function to refresh an expired or invalid access token using the refresh token
export const tokenRefresh = async (refreshToken) => {
  // If no refresh token is provided, log an error and return false
  if (!refreshToken) {
    console.error("Refresh token is not valid.");
    return false;
  }

  try {
    // Send a POST request to the token refresh endpoint with the refresh token in the body
    const response = await fetch(`${API_URL}/auth/token/refresh/`, {
      method: "POST",  // HTTP method is POST
      headers: {
        "Content-Type": "application/json",  // Specify the content type as JSON
      },
      body: JSON.stringify({
        refresh: refreshToken,  // Include the refresh token in the request body
      }),
    });

    // If the response status is 200, parse the response body to get the new access token
    if (response.status === 200) {
      const data = await response.json();
      const newAccessToken = data.access;  // Extract the new access token from the response
      console.log("Token successfully refreshed.");
      return newAccessToken;  // Return the new access token
    } else if (response.status === 401) {
      // If the response status is 401, the refresh token is invalid or expired
      console.error("Token is invalid or expired.");
      return false;
    } else {
      // Log any other unexpected response statuses
      console.error(`Unknown error: ${response.status}`);
      return false;
    }
  } catch (error) {
    // Catch and log any network or other errors
    console.error("Error refreshing token:", error);
    return false;  // Return false in case of any error
  }
};
