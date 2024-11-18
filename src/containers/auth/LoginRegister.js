import React, { useState } from "react";
import Login from "../../components/auth/Login";  // Import the Login component
import Register from "../../components/auth/Register";  // Import the Register component

const LoginRegister = () => {
  // State hook to manage whether the user is on the login or register screen
  const [isLogin, setIsLogin] = useState(true);

  // Function to toggle between login and register modes
  const toggleAuthMode = () => {
    setIsLogin((prevState) => !prevState);  // Switch between true (Login) and false (Register)
  };

  return (
    <div>
      {/* Conditional rendering based on the isLogin state */}
      {isLogin ? (
        // If isLogin is true, show the Login component
        <Login toggleAuthMode={toggleAuthMode} />
      ) : (
        // If isLogin is false, show the Register component
        <Register toggleAuthMode={toggleAuthMode} />
      )}
    </div>
  );
};

export default LoginRegister;
