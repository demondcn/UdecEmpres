"use client";
import React, {useState} from 'react';
import Sidebar from '@/components/AdminDashboardSContent/Sidebar'
import DashboardContent from '@/components/AdminDashboardSContent/DashboardInicio'
//import Adminpanel from '@/components/AdminDashboardCompleto';


const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex h-screen bg-[#2C5234]">
      <Sidebar onSelectSection={handleSectionChange} />
      <DashboardContent section={activeSection} />
    </div>
  );
};

export default AdminDashboard;

