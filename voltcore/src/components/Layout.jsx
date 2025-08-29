import React from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <TopBar />
      <Sidebar />

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
