import React from 'react';
import ProjectManagement from './ProjectManagement/ProjectManagement';
import './PTRmanagement.css'
function PTRmanagement() {
  return (
    <div className="management-container">
      <div>Manage Project Team and Role</div>
      <div className='project-management'>
        <button>Create Project</button>
        <ProjectManagement />
      </div>
    </div>
  );
}

export default PTRmanagement;
