// App.js
import React from 'react';
import { useAuth } from './context/authContext';

import Home from './containers/main/Home';
import LoginRegister from './containers/auth/LoginRegister';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <Home />
      ) : (
        <LoginRegister />
      )}
    </div>
  );
};

export default App;
