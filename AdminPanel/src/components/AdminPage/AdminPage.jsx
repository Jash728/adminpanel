import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../UserTable/UserTable.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './AdminPage.css';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [activeComponent, setActiveComponent] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      const response = await axios.get('http://localhost:8800/api/v3/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const countUserRoles = (users) => {
    const roleCounts = users.reduce((acc, user) => {
      const role = user.role.toLowerCase(); 
      if (acc[role]) {
        acc[role]++;
      } else {
        acc[role] = 1;
      }
      return acc;
    }, {});
    return roleCounts;
  };

  const generateChartData = (users) => {
    const roleCounts = countUserRoles(users);
    const labels = Object.keys(roleCounts);
    const data = Object.values(roleCounts);
    return {
      labels: labels,
      datasets: [
        {
          label: 'User Roles',
          backgroundColor: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8'],
          borderColor: 'rgba(0, 123, 255, 0.9)',
          borderWidth: 1,
          hoverBackgroundColor: ['#0056b3', '#218838', '#c82333', '#e0a800', '#138496'],
          hoverBorderColor: 'rgba(0, 123, 255, 1)',
          data: data,
        },
      ],
    };
  };

  const chartData = generateChartData(users);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="main-content">
        <div className="admin-page">
          <h2>Admin Dashboard</h2>
          <div className="chart-container">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>
          <UserTable users={users} fetchUsers={fetchUsers} />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
