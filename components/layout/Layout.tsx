import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen w-full relative text-text-primary">
      {/* Dreamy Sunset Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(180deg, 
              rgba(245,245,220,1) 0%, 
              rgba(255,223,186,0.8) 25%, 
              rgba(255,182,193,0.6) 50%, 
              rgba(147,112,219,0.7) 75%, 
              rgba(72,61,139,0.9) 100%
            ),
            radial-gradient(circle at 30% 20%, rgba(255,255,224,0.4) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(72,61,139,0.6) 0%, transparent 70%),
            radial-gradient(circle at 50% 60%, rgba(147,112,219,0.3) 0%, transparent 60%)
          `,
        }}
      />
      <div className="relative z-10 flex h-screen bg-transparent overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;