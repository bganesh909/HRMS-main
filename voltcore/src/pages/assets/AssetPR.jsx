import React, { useState } from 'react';
import './AssetPR.css';

const AssetPR = () => {
  const [assetRequests, setAssetRequests] = useState([
    {
      userName: 'John Doe',
      category: 'Laptop',
      description: 'Need a new laptop for development work.',
      status: 'Pending',
    },
    {
      userName: 'Jane Smith',
      category: 'Monitor',
      description: 'Requesting an extra monitor for better productivity.',
      status: 'Pending',
    },
    {
      userName: 'Michael Brown',
      category: 'Keyboard',
      description: 'Replace my old keyboard, keys are malfunctioning.',
      status: 'Pending',
    },
  ]);

  const handleApproveRequest = (index) => {
    const updatedRequests = [...assetRequests];
    updatedRequests[index].status = 'Approved';
    setAssetRequests(updatedRequests);
  };

  const handleRejectRequest = (index) => {
    const updatedRequests = [...assetRequests];
    updatedRequests[index].status = 'Rejected';
    setAssetRequests(updatedRequests);
  };

  return (
    <div className="asset-pr-container">
      <h2>Asset Purchase Requests (PR)</h2>

      {/* Card wrapper */}
      <div className="asset-card">
        <table className="table-style1">
          <thead>
            <tr>
              <th>User</th>
              <th>Category</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assetRequests.map((request, index) => (
              <tr key={index}>
                <td>{request.userName}</td>
                <td>{request.category}</td>
                <td>{request.description}</td>
                <td>{request.status}</td>
                <td>
                  {request.status === 'Pending' ? (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleApproveRequest(index)}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleRejectRequest(index)}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>{request.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetPR;
