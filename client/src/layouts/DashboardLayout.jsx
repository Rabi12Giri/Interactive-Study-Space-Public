import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Body */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        <div className="p-8 bg-gray-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
