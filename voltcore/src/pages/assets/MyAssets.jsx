import React, { useState } from 'react';
import './MyAssets.css';

const MyAssets = () => {
  const assetData = [
    {
      assetType: 'Laptop',
      serialNumber: 'DLT5420-001',
      assignedDate: '2025-04-15',
      status: 'working',
    },
    {
      assetType: 'Monitor',
      serialNumber: 'HP-MON-124',
      assignedDate: '2025-03-22',
      status: 'damaged',
    },
    {
      assetType: 'Keyboard',
      serialNumber: 'LOG-KB-776',
      assignedDate: '2025-04-01',
      status: 'returned',
    },
  ];

  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    category: '',
    description: '',
  });

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleReturnAsset = (index) => {
    alert(`Asset at row ${index + 1} marked for return.`);
    setDropdownIndex(null);
  };

  const handleReportIssue = (index) => {
    alert(`Reported issue for asset at row ${index + 1}. Notified admin.`);
    setDropdownIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Asset Request Submitted:\n${JSON.stringify(formData, null, 2)}`);
    setFormData({ userName: '', category: '', description: '' });
    setShowRequestForm(false);
  };

  return (
    <div className="my-assets-container">
      <div className="header">
        <h2>My Assigned Assets</h2>
        <button className="request-btn" onClick={() => setShowRequestForm(!showRequestForm)}>
          Asset Request
        </button>
      </div>

      {showRequestForm && (
  <div className="overlay">
    <div className="request-popup-card">
      <form className="request-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="Request User Name"
          value={formData.userName}
          onChange={handleInputChange}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Asset Category</option>
          <option value="Laptop">Laptop</option>
          <option value="Monitor">Monitor</option>
          <option value="Keyboard">Keyboard</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" className="cancel-btn" onClick={() => setShowRequestForm(false)}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
)}


      <div className="asset-card">
        <table className="table-style1">
          <thead>
            <tr>
              <th> Asset Type</th>
              <th>Asset ID</th>
              <th>Assigned Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assetData.map((asset, index) => (
              <tr key={index}>
                <td>{asset.assetType}</td>
                <td>{asset.serialNumber}</td>
                <td>{asset.assignedDate}</td>
                <td>{asset.status}</td>
                <td className="actions-cell">
                  <div className="actions-dropdown">
                    <button className="dots-btn" onClick={() => toggleDropdown(index)}>⋮</button>
                    {dropdownIndex === index && (
                      <div className="dropdown-menu">
                        <div onClick={() => handleReturnAsset(index)}>Return Asset</div>
                        <div onClick={() => handleReportIssue(index)}>Report Issue</div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssets;
