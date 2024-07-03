import React from 'react';
import './UnifiedTable.css';

const UnifiedTable = ({ issues, documents }) => {
  return (
    <div className="table-container">
      <div className="table">
        <div className="column">
          <h3>Issues</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.id}</td>
                  <td>{issue.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="column">
          <h3>Documents</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <tr key={document.id}>
                  <td>{document.id}</td>
                  <td>{document.docname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UnifiedTable;
