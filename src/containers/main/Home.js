import React from 'react';
import { useAuth } from '../../context/authContext';

const Home = () => {
  const { logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="">
      <h1>Welcome to the Home</h1>
      <p>You are authenticated!</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Home;
