import React, { useState } from 'react';
import leaveRequestsData from './LeaveData';
import './LeaveList.css';

function LeaveList() {
  const [leaveRequests, setLeaveRequests] = useState(leaveRequestsData);

  const handleAction = (id, action) => {
    const updated = leaveRequests.map((request) =>
      request.id === id ? { ...request, status: action } : request
    );
    setLeaveRequests(updated);
  };

  return (
    <div className="leave-list-container">
      
      <table className="leave-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>ID</th>
            <th>Leave Type</th>
            <th>Start</th>
            <th>End</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.employeeName}</td>
              <td>{leave.employeeId}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>
                {leave.status === 'Pending' && (
                  <>
                    <button onClick={() => handleAction(leave.id, 'Approved')}>Approve</button>
                    <button onClick={() => handleAction(leave.id, 'Rejected')}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveList;
