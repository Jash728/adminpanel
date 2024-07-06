import { useState, useEffect } from 'react';
import UnifiedTable from './UnifiedTable/UnifiedTable.jsx';
import axios from 'axios';

const MainComponent = ({ activeComponent }) => {
  const [issues, setIssues] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem('user')).token;

        
        const issuesResponse = await axios.get('http://localhost:8800/api/v1/issues', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIssues(issuesResponse.data);

        
        const documentsResponse = await axios.get('http://localhost:8800/api/v1/uploads', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDocuments(documentsResponse.data);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (activeComponent === 'menu') {
      fetchData();
    }
  }, [activeComponent]);

  return (
    <div className="main-component">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {activeComponent === 'upload' && <h2>Upload Document Component</h2>}
      {activeComponent === 'create' && <h2>Create Issue Component</h2>}
      {activeComponent === 'menu' && <UnifiedTable issues={issues} documents={documents} />}
    </div>
  );
};

export default MainComponent;
