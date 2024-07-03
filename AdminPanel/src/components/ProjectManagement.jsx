import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import UploadDocument from './UploadDocument';
import CreateIssue from './CreateIssue';
import AddLead from './AddLead';

import MainComponent from './MainComponent.jsx'
import "../App.css";
import AdminPage from './AdminPage.jsx';

function ProjectManagement() {
  const [activeComponent, setActiveComponent] = useState('upload');
  const [role, setRole] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (user && user.role) {
      setRole(user.role);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); 
    navigate('/login'); 
  };

  return (
    <div className="app">
      <Sidebar setActiveComponent={setActiveComponent} role={role} handleLogout={handleLogout} />
      <div className='main-content'>
        {role === 'project manager' && activeComponent === 'upload' && <UploadDocument />}
        {role === 'project manager' && activeComponent === 'create' && <CreateIssue />}
        {role === 'project manager' && activeComponent === 'menu' && <MainComponent activeComponent={activeComponent} />}
        {role === 'sales' && <AddLead />}
        {role === 'admin' && <AdminPage />}
      </div>
    </div>
  );
}

export default ProjectManagement;