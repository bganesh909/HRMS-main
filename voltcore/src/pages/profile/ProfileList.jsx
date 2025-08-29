import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployee } from '../../components/Profile/EmployeeContext';
import './ProfileList.css';

const ProfileList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setProfile } = useEmployee();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8000/employees/');
        if (!response.ok) throw new Error('Failed to fetch employee data');
        const data = await response.json();
        console.log('Fetched employees:', data); // Debug log
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    setProfile(employee);
    navigate('/basic-details', { state: { profile: employee } });
  };

  const handleDelete = async (employeeId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/employees/${employeeId}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
        alert('Employee deleted successfully');
      } else {
        alert('Failed to delete employee');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting employee');
    }
  };

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>Error: {error}</p>;
  if (employees.length === 0) return <p>No employees found.</p>;

  return (
    <div className="profile-list-container">
      <h1 className="emp-head">Employee Profiles</h1>
      <ul className="profile-list">
        {employees.map((employee) => (
          <li key={employee.id} className="profile-item">
            <img
              src="https://placehold.co/100x100"
              alt={employee.user?.full_name || 'Employee'}
              className="profile-list-image"
            />
            <div className="profile-info">
              <h3>{employee.user?.full_name || 'N/A'}</h3>
              <p><strong>Employee ID:</strong> {employee.employee_id}</p>
              <p><strong>Email:</strong> {employee.user?.email || 'N/A'}</p>
              <p><strong>Phone:</strong> {employee.user?.profile?.phone || 'N/A'}</p>
              <p><strong>Gender:</strong> {employee.gender || 'N/A'}</p>
              <p><strong>Status:</strong> {employee.employment_status || 'N/A'}</p>
              <button onClick={() => handleEdit(employee)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(employee.id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
