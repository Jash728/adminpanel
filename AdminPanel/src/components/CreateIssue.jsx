import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./CreateIssue.css";

const CreateIssue = () => {
  const [issueDescription, setIssueDescription] = useState('');

  const handleCreate = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      if (!token) {
        throw new Error('Token not found');
      }

      await axios.post(
        "http://localhost:8800/api/v1/issue",
        { description: issueDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Issue created successfully.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setIssueDescription(''); 
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error("Creation failed.", {
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

  return (
    <div className='create-issue'>
      <h2>Create Issue</h2>
      <input
        type="text"
        placeholder="Issue Description"
        value={issueDescription}
        onChange={(e) => setIssueDescription(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
      <ToastContainer />
    </div>
  );
};

export default CreateIssue;
