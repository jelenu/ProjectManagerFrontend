import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { login, register, tokenVerify, tokenRefresh } from '../services/authService';  

// Crear el contexto de autenticación
const AuthContext = createContext();

// Función para leer una cookie por su nombre
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Función para guardar una cookie
const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/;`;

};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const checkTokenValidity = useCallback(async (accessToken, refreshToken) => {
    const isValid = await tokenVerify(accessToken);
    if (isValid) {
      console.log("Token is valid.");
      return true;
    } else {
      console.log("Token is invalid, attempting to refresh...");
      const newAccessToken = await tokenRefresh(refreshToken);
      
      if (newAccessToken) {
        setAccessToken(newAccessToken);
        setCookie('accessToken', newAccessToken, 1);  // Guardar en cookie (expira en 1 día)
        console.log("Token refreshed successfully.");
        return true;
      } else {
        logoutUser();
        console.error("Both tokens have expired or are invalid.");
        return false;
      }
    }
  }, []);

  useEffect(() => {
    const checkTokens = async () => {
      const savedAccessToken = getCookie('accessToken');
      const savedRefreshToken = getCookie('refreshToken');
      
      if (savedAccessToken && savedRefreshToken) {
        const isValid = await checkTokenValidity(savedAccessToken, savedRefreshToken);
        if(isValid) {
          setAccessToken(savedAccessToken);
          setRefreshToken(savedRefreshToken);
          setIsAuthenticated(true);
        }
      }
    };

    checkTokens();
  }, [checkTokenValidity]);

  const loginUser = async (username, password) => {
    try {
      const data = await login(username, password);

      if (data.error) {
        return { error: data.error };
      }

      // Guardar los tokens en cookies
      setCookie('accessToken', data.accessToken, 1);  // Expira en 1 día
      setCookie('refreshToken', data.refreshToken, 7);  // Expira en 7 días

      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setIsAuthenticated(true);

      console.log('Cookies after login:', document.cookie);  // Ver las cookies en la consola

      
      return { success: true };
    } catch (error) {
      console.error("Authentication error", error);
      return { error: "Error making login request" };
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      const data = await register(username, email, password);

      if (data.error) {
        return { error: data.error };
      }

      return { success: true };
    } catch (error) {
      console.error("Registration error", error);
      return { error: "Error making registration request" };
    }
  };

  const logoutUser = () => {
    // Eliminar los tokens de las cookies
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    
    // Resetear el estado
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      accessToken,      
      refreshToken,     
      loginUser,        
      registerUser,     
      logoutUser        
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
