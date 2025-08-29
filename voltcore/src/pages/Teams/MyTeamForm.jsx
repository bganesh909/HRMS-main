import React, { useState } from 'react';
import './Teams.css';

const MyTeamForm = () => {
  const [formData, setFormData] = useState({
    teamName: 'Alpha Squad',
    teamLead: 'EMP001',
    members: 'EMP002, EMP003',
    description: 'Handles frontend and UX tasks.',
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    alert('Team details saved!');
  };

  return (
    <div className="my-team-wrapper">
      <div className="my-team-card">
        <h2>My Team</h2>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <label>Team Name</label>
            <input name="teamName" value={formData.teamName} onChange={handleChange} required />

            <label>Team Lead</label>
            <input name="teamLead" value={formData.teamLead} onChange={handleChange} required />

            <label>Members</label>
            <textarea
              name="members"
              value={formData.members}
              onChange={handleChange}
              rows="2"
              required
            />

            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />

            <button type="submit">Save</button>
          </form>
        ) : (
          <div className="my-team-display">
            <p>
              <strong>Team Name:</strong> {formData.teamName}
            </p>
            <p>
              <strong>Team Lead:</strong> {formData.teamLead}
            </p>
            <p>
              <strong>Members:</strong> {formData.members}
            </p>
            <p>
              <strong>Description:</strong> {formData.description}
            </p>
            <button onClick={() => setEditMode(true)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTeamForm;
