import React from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css";

const Sidebar = ({setActiveComponent, role, handleLogout }) => {
  const usename = JSON.parse(localStorage.getItem('user'))
  return (
    <div className="sidebar">
      {<h2>{usename.name}</h2>}
      {role === 'project manager' && (
        <>
          <button onClick={() => setActiveComponent('upload')}>Upload Document</button>
          <button onClick={() => setActiveComponent('create')}>Create Issue</button>
          <button onClick={() => setActiveComponent('menu')}>Show Issues and Documents</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      {role === 'sales' && (
        <>
          <button onClick={() => setActiveComponent('add-lead')}>Add Lead</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      {role === 'admin' && (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
