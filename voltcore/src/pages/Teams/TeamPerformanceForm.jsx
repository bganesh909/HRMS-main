import React, { useState } from 'react';
import './Teams.css';

export const TeamPerformanceForm = () => {
  const [formData, setFormData] = useState({
    employeeId: 'EMP002',
    reviewPeriod: 'Q1 2024',
    score: '8',
    comments: 'Great attention to detail in deliverables.',
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    alert('Performance review saved!');
  };

  return (
    <div className="basic-details-form">
      <h2>Team Performance</h2>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <label>Employee ID:</label>
          <input name="employeeId" value={formData.employeeId} onChange={handleChange} required />

          <label>Review Period:</label>
          <input
            name="reviewPeriod"
            value={formData.reviewPeriod}
            onChange={handleChange}
            required
          />

          <label>Score (1–10):</label>
          <input
            type="number"
            name="score"
            min="1"
            max="10"
            value={formData.score}
            onChange={handleChange}
            required
          />

          <label>Comments:</label>
          <textarea name="comments" value={formData.comments} onChange={handleChange} rows={3} />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="view-mode">
          <p>
            <strong>Employee ID:</strong> {formData.employeeId}
          </p>
          <p>
            <strong>Review Period:</strong> {formData.reviewPeriod}
          </p>
          <p>
            <strong>Score:</strong> {formData.score}
          </p>
          <p>
            <strong>Comments:</strong> {formData.comments}
          </p>
          <button type="button" onClick={() => setEditMode(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};
export default TeamPerformanceForm;
