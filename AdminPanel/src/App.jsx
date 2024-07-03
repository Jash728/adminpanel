import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import ProjectManagement from './components/ProjectManagement.jsx';
import UploadDocument from './components/UploadDocument.jsx';
import CreateIssue from './components/CreateIssue.jsx';
import AdminPage from './components/AdminPage.jsx';
import AddLead from './components/AddLead.jsx'; // Assuming you have this component
import Sidebar from './components/Sidebar.jsx'; // Assuming you have this component
import './App.css'; // Ensure styles are applied

function App() {
  const [user, setUser] = useState(null);
  const [activeComponent, setActiveComponent] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        <div>
          <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/projectManager" element={<ProjectManagement />} />
            <Route path="/projectManager/upload" element={<UploadDocument />} />
            <Route path="/projectManager/issue" element={<CreateIssue />} />
            <Route path="/sales" element={<ProjectManagement />} />
            <Route path="/admin" element={<ProjectManagement />} />

            {/* Redirect to login if no user or unauthorized */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
