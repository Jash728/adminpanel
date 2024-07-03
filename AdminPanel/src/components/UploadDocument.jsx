import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./UploadDocument.css";

const UploadDocument = () => {
  const [documentName, setDocumentName] = useState('');

  const handleUpload = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      if (!token) {
        throw new Error('Token not found');
      }

      await axios.post(
        "http://localhost:8800/api/v1/upload",
        { docname: documentName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Document uploaded successfully.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error("Upload failed.", {
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
    <div className="upload-document">
      <h2>Upload Document</h2>
      <input
        type="text"
        placeholder="Document Name"
        value={documentName}
        onChange={(e) => setDocumentName(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
      <ToastContainer />
    </div>
  );
};

export default UploadDocument;
