import React from 'react';
import { useAuth } from '../../context/authContext';

const Header = () => {

    const { logoutUser } = useAuth();

    const handleLogout = () => {
        logoutUser();
      };
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">My App</h1>
      <div>
      <button onClick={handleLogout}>Log out</button>

      </div>
    </header>
  );
};

export default Header;
