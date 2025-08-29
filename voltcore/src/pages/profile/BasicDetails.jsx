import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useEmployee } from '../../components/Profile/EmployeeContext';
import ProfileNavbar from '../../components/Profile/ProfileNavbar';
import "./BasicDetails.css";

const BasicDetails = () => {
  const location = useLocation();
  const passedProfile = location.state?.profile;

  const defaultProfileData = {
    id: null,
    full_name: '',
    employee_id: '',
    date_of_birth: '',
    gender: '',
    email: '',
    phone: '',
    alt_phone: '',
    current_address: '',
    permanent_address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
  };

  const { profile, setProfile } = useEmployee();

  const [personalInfo, setPersonalInfo] = useState(passedProfile || profile || defaultProfileData);

  useEffect(() => {
    if (passedProfile) {
      setPersonalInfo(passedProfile);
      setProfile(passedProfile); // sync to context
    }
  }, [passedProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const { id, ...payload } = personalInfo;
      const method = id ? 'PUT' : 'POST';
      const url = id
        ? `http://127.0.0.1:8000/profiles/${id}/`
        : 'http://127.0.0.1:8000/profiles/';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const savedProfile = await response.json();
        alert(`Profile ${id ? 'updated' : 'created'} successfully!`);
        setProfile(savedProfile);
        setPersonalInfo(savedProfile);
      } else {
        const errorData = await response.json();
        alert('Error saving profile: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  return (
    <div className="employee-profile">
      <ProfileNavbar />
      <div className="profile-header">
        <img
          src={"https://placehold.co/100x100"}
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-info">
          <h2 className="employee-name">
            {personalInfo.full_name || 'New Employee'}{' '}
            {personalInfo.id && `(ID: ${personalInfo.id})`}
          </h2>
          <p>Employee ID: {personalInfo.employee_id || 'N/A'}</p>
        </div>
      </div>

      <div className="profile-details">
        <div className="personal-info">
          <div className="personal-info-header">
            <h3>Personal Information</h3>
          </div>

          <div className="info-grid">
            {/* All form fields (same as before) */}
            {[
              { label: "Full Name", name: "full_name" },
              { label: "Employee ID", name: "employee_id" },
              { label: "Date of Birth", name: "date_of_birth", type: "date" },
              { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Other"] },
              { label: "Email", name: "email" },
              { label: "Phone", name: "phone" },
              { label: "Alt Phone", name: "alt_phone" },
              { label: "Current Address", name: "current_address" },
              { label: "Permanent Address", name: "permanent_address" },
              { label: "City", name: "city" },
              { label: "State", name: "state" },
              { label: "Zip Code", name: "zip_code" },
              { label: "Country", name: "country" },
            ].map(({ label, name, type = "text", options }) => (
              <div key={name}>
                <label><strong>{label}</strong></label>
                {type === "select" ? (
                  <select name={name} value={personalInfo[name]} onChange={handleChange}>
                    <option value="">Select</option>
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={personalInfo[name]}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="save-btn-container">
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
