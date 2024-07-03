import React, { useState } from 'react';
import axios from 'axios';
import './AddLead.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddLead = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const handleAddLead = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      await axios.post(
        'http://localhost:8800/api/v2/add-lead',
        { customer_name: customerName, customer_email: customerEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Lead added successfully.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error(error);
      toast.error("Lead adding failed.", {
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
    <div className="add-lead-container">
      <h2>Add Customer Lead</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="email"
          placeholder="Customer Email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
      </div>
      <button onClick={handleAddLead}>Add Lead</button>
      <ToastContainer />
    </div>
  );
};

export default AddLead;
