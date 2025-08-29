import React, { useState } from 'react';
import './Experience.css';

function Experience() {
  const [experienceList, setExperienceList] = useState([]);
  const [experience, setExperience] = useState({
    companyName: '',
    jobTitle: '',
    employmentType: '',
    department: '',
    location: '',
    website: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    responsibilities: '',
    achievements: '',
    managerName: '',
    managerContact: '',
    relievingLetter: '',
    experienceCertificate: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setExperience({ ...experience, [name]: checked });
    } else if (type === 'file') {
      setExperience({ ...experience, [name]: files[0]?.name || '' });
    } else {
      setExperience({ ...experience, [name]: value });
    }
  };

  const handleAdd = () => {
    setExperienceList([...experienceList, experience]);
    setExperience({
      companyName: '',
      jobTitle: '',
      employmentType: '',
      department: '',
      location: '',
      website: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      responsibilities: '',
      achievements: '',
      managerName: '',
      managerContact: '',
      relievingLetter: '',
      experienceCertificate: '',
    });
  };

  const handleDelete = (index) => {
    const updated = [...experienceList];
    updated.splice(index, 1);
    setExperienceList(updated);
  };

  return (
    <div className="experience-container">
      <div className="experience-form-wrapper">
        <h2>Experience Details</h2>

        <div className="form-grid">
          <div>
            <label>Company Name</label>
            <input name="companyName" value={experience.companyName} onChange={handleChange} />
          </div>
          <div>
            <label>Job Title / Designation</label>
            <input name="jobTitle" value={experience.jobTitle} onChange={handleChange} />
          </div>
          <div>
            <label>Employment Type</label>
            <select name="employmentType" value={experience.employmentType} onChange={handleChange}>
              <option value="">Select</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>
          <div>
            <label>Department</label>
            <input name="department" value={experience.department} onChange={handleChange} />
          </div>
          <div>
            <label>Location</label>
            <input name="location" value={experience.location} onChange={handleChange} />
          </div>
          <div>
            <label>Company Website</label>
            <input name="website" value={experience.website} onChange={handleChange} />
          </div>
          <div>
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={experience.startDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={experience.endDate}
              onChange={handleChange}
              disabled={experience.currentlyWorking}
            />
          </div>
          <div className="full-width">
            <label>
              <input
                type="checkbox"
                name="currentlyWorking"
                checked={experience.currentlyWorking}
                onChange={handleChange}
              />
              Currently Working Here
            </label>
          </div>
          <div className="full-width">
            <label>Roles & Responsibilities</label>
            <textarea
              name="responsibilities"
              value={experience.responsibilities}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="full-width">
            <label>Key Achievements / Projects</label>
            <textarea
              name="achievements"
              value={experience.achievements}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div>
            <label>Manager Name</label>
            <input name="managerName" value={experience.managerName} onChange={handleChange} />
          </div>
          <div>
            <label>Manager Contact</label>
            <input
              name="managerContact"
              value={experience.managerContact}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Relieving Letter</label>
            <input type="file" name="relievingLetter" onChange={handleChange} />
          </div>
          <div>
            <label>Experience Certificate</label>
            <input type="file" name="experienceCertificate" onChange={handleChange} />
          </div>
        </div>

        <div className="buttons">
          <button type="button" onClick={handleAdd}>
            ➕ Add Experience
          </button>
        </div>

        {experienceList.length > 0 && (
          <div className="experience-list">
            <h3>Added Experiences</h3>
            {experienceList.map((exp, idx) => (
              <div key={idx} className="experience-item">
                <strong>
                  {exp.companyName} - {exp.jobTitle}
                </strong>
                <button type="button" onClick={() => handleDelete(idx)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Experience;