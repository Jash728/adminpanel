import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 
import axios from "axios";

function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );

      console.log("Login response:", res.data); 
      if (res.data && res.data.token && res.data.role) {
        const userData = {
          token: res.data.token,
          role: res.data.role,
          name: res.data.name, 
        };

        setCurrentUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("User set in local storage:", userData); 

        
        if (userData.role === 'project manager') {
          console.log("Jash SHah")
          navigate("/projectManager");
        } else if (userData.role === 'sales') {
          navigate("/sales");
        } else if (userData.role === 'admin') {
          navigate("/admin");
        }
      } else {
        setErr("Invalid login response");
      }
    } catch (err) {
      setErr(err.response ? err.response.data : "An error occurred");
      console.error("Error:", err);
    }
  };

  return (
    <>
    
    <div className="form-container">
      <h4>Login Form</h4>
      <form>
        <input
          className="form-input"
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />

        <input
          className="form-input"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        {err && <p className="error">{err}</p>}
        <button type="submit" onClick={handleSubmit}>Login</button>

        <p>
          Don't you have an account? <a href="/">Register</a>
        </p>
      </form>
    </div>
    </>
    
  );
}

export default Login;
