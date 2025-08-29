import React, { useState } from 'react';
import "./onboard.css";

const OnBoarding = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    surname: '',
    email: '',
    department: '',
    position: '',
    JoiningDate: ''
  });

  const [employees, setEmployees] = useState([
    { firstName: 'Abhi', surname: 'Ram', JoiningDate: '2025-05-02' },
    { firstName: 'Surya', surname: 'Kumar', JoiningDate: '2025-05-02' },
    { firstName: 'kiran', surname: 'kumar', JoiningDate: '2025-05-03' },
    { firstName: 'Hari', surname: 'shankar', JoiningDate: '2025-05-05' },
    { firstName: 'Naveen', surname: 'Kumar', JoiningDate: '2025-05-05' },
    { firstName: 'Varun', surname: 'reddy', JoiningDate: '2025-05-05' },
  ]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Onboarding Employee:', formData);

    setEmployees(prev => [
      ...prev,
      {
        firstName: formData.firstName,
        surname: formData.surname,
        JoiningDate: formData.JoiningDate
      }
    ]);
    
    alert('Employee onboarded successfully!');
  };

  const filteredEmployees = employees.filter(emp => emp.JoiningDate === formData.JoiningDate);

  return (
    <div className="onboard-wrapper"><area shape="" coords="" href="" alt="" />
      <div className="cards-container">
        {/* Onboarding Form Card */}
        <div className="card onboarding-card">
          <h2>Employee Onboarding</h2>
          <form onSubmit={handleSubmit} className="onboard-form">
            <div className="row-group">
              <div className="form-field">
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="form-field">
                <label>Middle Name</label>
                <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label>Surname</label>
                <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
              </div>
            </div>

            <div className="row-group">
              <div className="form-field">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-field">
                <label>Department</label>
                <input type="text" name="department" value={formData.department} onChange={handleChange} required />
              </div>
            </div>

            <div className="row-group">
              <div className="form-field">
                <label>Position</label>
                <input type="text" name="position" value={formData.position} onChange={handleChange} required />
              </div>
              <div className="form-field">
                <label>Joining Date</label>
                <input type="date" name="JoiningDate" value={formData.JoiningDate} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <button type="submit" className="submit-btns">OnBoard</button>
            </div>
          </form>
        </div>

        {/* Available Candidates Card */}
        <div className="card available-candidates-card">
          <h3>Employees Onboarding on {formData.JoiningDate}</h3>
          {filteredEmployees.length > 0 ? (
            <ul>
              {filteredEmployees.map((emp, index) => (
                <li key={index}>{emp.firstName} {emp.surname}</li>
              ))}
            </ul>
          ) : (
            <p>No employees onboarded on this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
