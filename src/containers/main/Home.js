import React from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/SideBar';
import CreateProject from '../../components/projects/CreateProject';

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-gray-100 p-6 overflow-auto">
          <CreateProject/>
        </main>
      </div>
    </div>
  );
};

export default Home;
