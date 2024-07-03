import React, { useState } from "react";
import "./Register.css"; 
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Registration() {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    role: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const existingUser = await checkExistingUser(inputs.username, inputs.email, inputs.role);
      if (existingUser) {
        toast.error('Username or Email with the same Role already exists.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      setInputs({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        role: "",
        password: "",
      });
      toast.success('Registration successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error('Registration error:', err);
      toast.error('Registration failed. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const checkExistingUser = async (username, email, role) => {
    try {
      const response = await axios.get(`http://localhost:8800/api/auth/check-user?username=${username}&email=${email}&role=${role}`);
      return response.data.exists; 
    } catch (error) {
      console.error('Error checking existing user:', error);
      return false;
    }
  };

  return (
    <>
      <div className="form-container">
        <h4>Registration Form</h4>
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="First Name"
            name="firstname"
            onChange={handleChange}
            value={inputs.firstname}
            required
          />
          <input
            className="form-input"
            type="text"
            placeholder="Last Name"
            name="lastname"
            onChange={handleChange}
            value={inputs.lastname}
            required
          />
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={inputs.email}
            required
          />
          <input
            className="form-input"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={inputs.username}
            required
          />
          <label className="role-label">Role:</label>
          <label className="role-input">
            <input
              type="radio"
              name="role"
              value="admin"
              onChange={handleChange}
              checked={inputs.role === 'admin'}
              required
            />
            Admin
          </label>
          <label className="role-input">
            <input
              type="radio"
              name="role"
              value="project manager"
              onChange={handleChange}
              checked={inputs.role === 'project manager'}
              required
            />
            Project Manager
          </label>
          <label className="role-input">
            <input
              type="radio"
              name="role"
              value="sales"
              onChange={handleChange}
              checked={inputs.role === 'sales'}
              required
            />
            Sales
          </label>
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={inputs.password}
            required
          />
          {err && <p>{err}</p>}
          <button type="submit">Register</button>
          <p>
            Already signed in? <a href="/login">Login</a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Registration;
