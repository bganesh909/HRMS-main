import React, { useState } from 'react';
import './BasicDetails.css';

function ContractsForm() {
  const [formData, setFormData] = useState({
    contractTitle: '',
    employeeId: '',
    contractType: '',
    startDate: '',
    endDate: '',
    contractValue: '',
    terms: '',
    uploadContract: null,
    status: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'uploadContract') {
      setFormData({ ...formData, uploadContract: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Contract Data:', formData);
    alert('Contract Details Saved Successfully!');
  };

  return (
    <div className="basic-details-form">
      <h2>Contract Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Contract Title:</label>
        <input
          name="contractTitle"
          value={formData.contractTitle}
          onChange={handleChange}
          required
        />

        <label>Employee ID:</label>
        <input name="employeeId" value={formData.employeeId} onChange={handleChange} required />

        <label>Contract Type:</label>
        <select name="contractType" value={formData.contractType} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Freelance">Freelance</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <label>Contract Value ($):</label>
        <input
          type="number"
          name="contractValue"
          value={formData.contractValue}
          onChange={handleChange}
          required
        />

        <label>Terms and Conditions:</label>
        <textarea name="terms" value={formData.terms} onChange={handleChange} rows={4} required />

        <label>Upload Signed Contract:</label>
        <input type="file" name="uploadContract" onChange={handleChange} accept=".pdf,.doc,.docx" />

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Terminated">Terminated</option>
        </select>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ContractsForm;
