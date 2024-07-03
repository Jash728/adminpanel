import React, { useState } from 'react';
import axios from 'axios';
import './UserTable.css'; 

const UserTable = ({ users, fetchUsers }) => {
  const [editUser, setEditUser] = useState(null);

  const handleDelete = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      await axios.delete(`http://localhost:8800/api/v3/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleSave = async (user) => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      await axios.put(`http://localhost:8800/api/v3/user/${user.id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="user-table-container">
      <h3>Users</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={editUser?.id === user.id ? 'editing' : ''}>
              <td>{editUser?.id === user.id ? (
                <input
                  type="text"
                  name="firstname"
                  value={editUser.firstname}
                  onChange={handleChange}
                />
              ) : (
                user.firstname
              )}</td>
              <td>{editUser?.id === user.id ? (
                <input
                  type="text"
                  name="lastname"
                  value={editUser.lastname}
                  onChange={handleChange}
                />
              ) : (
                user.lastname
              )}</td>
              <td>{editUser?.id === user.id ? (
                <input
                  type="email"
                  name="email"
                  value={editUser.email}
                  onChange={handleChange}
                />
              ) : (
                user.email
              )}</td>
              <td>{editUser?.id === user.id ? (
                <input
                  type="text"
                  name="username"
                  value={editUser.username}
                  onChange={handleChange}
                />
              ) : (
                user.username
              )}</td>
              <td>{editUser?.id === user.id ? (
                <select
                  name="role"
                  value={editUser.role}
                  onChange={handleChange}
                >
                  <option value="admin">Admin</option>
                  <option value="project manager">Project Manager</option>
                  <option value="sales">Sales</option>
                </select>
              ) : (
                user.role
              )}</td>
              <td className="action-buttons">
                {editUser?.id === user.id ? (
                  <>
                    <button className="save-btn" onClick={() => handleSave(editUser)}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditUser(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
