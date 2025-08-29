import React, { useState } from 'react';
import './Teams.css';

export const TeamRequestsForm = () => {
  const [formData, setFormData] = useState({
    requestType: 'Join',
    employeeId: 'EMP005',
    reason: 'Wants to assist the QA team.',
    status: 'Pending',
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    alert('Request saved!');
  };

  return (
    <div className="basic-details-form">
      <h2>Team Requests</h2>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <label>Request Type:</label>
          <select name="requestType" value={formData.requestType} onChange={handleChange}>
            <option value="Join">Join</option>
            <option value="Leave">Leave</option>
          </select>

          <label>Employee ID:</label>
          <input name="employeeId" value={formData.employeeId} onChange={handleChange} required />

          <label>Reason:</label>
          <textarea name="reason" value={formData.reason} onChange={handleChange} rows={3} />

          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="view-mode">
          <p>
            <strong>Request Type:</strong> {formData.requestType}
          </p>
          <p>
            <strong>Employee ID:</strong> {formData.employeeId}
          </p>
          <p>
            <strong>Reason:</strong> {formData.reason}
          </p>
          <p>
            <strong>Status:</strong> {formData.status}
          </p>
          <button type="button" onClick={() => setEditMode(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};
export default TeamRequestsForm;
