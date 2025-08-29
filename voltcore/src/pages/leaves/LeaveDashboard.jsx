import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import ApplyLeaveForm from "./ApplyLeave";
import { FaUserMd, FaUmbrellaBeach, FaCalendarAlt, FaEdit } from "react-icons/fa";
import "./LeaveDashboard.css";

function LeaveDashboard() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterFromDate, setFilterFromDate] = useState("");
  const [filterToDate, setFilterToDate] = useState("");
  const [editingLeave, setEditingLeave] = useState(null);

  const fetchLeaves = () => {
    axios
      .get("http://localhost:8000/leave/", { withCredentials: true })
      .then((res) => setLeaveRequests(res.data))
      .catch((err) => console.error("Failed to fetch leaves:", err));
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const countLeaves = (type) =>
    leaveRequests.filter((leave) => leave.leaveType === type).length;

  const totalLeaves = { Sick: 6, Casual: 18 };
  const usedLeaves = {
    Sick: countLeaves("Sick"),
    Casual: countLeaves("Casual"),
  };
  const remainingLeaves = {
    Sick: totalLeaves.Sick - usedLeaves.Sick,
    Casual: totalLeaves.Casual - usedLeaves.Casual,
    Total:
      totalLeaves.Sick + totalLeaves.Casual - (usedLeaves.Sick + usedLeaves.Casual),
  };

  const filteredLeaves = leaveRequests.filter((l) => {
    const matchesType = filterType === "All" || l.leaveType === filterType;
    const matchesStatus = filterStatus === "All" || l.status === filterStatus;
    const start = new Date(l.startDate);
    const from = filterFromDate ? new Date(filterFromDate) : null;
    const to = filterToDate ? new Date(filterToDate) : null;
    return matchesType && matchesStatus && (!from || start >= from) && (!to || start <= to);
  });

  const getStatusBadge = (status) => {
    const s = status.toLowerCase();
    if (s === "approved") return <span className="badge badge-approved">Approved</span>;
    if (s === "rejected") return <span className="badge badge-rejected">Rejected</span>;
    return <span className="badge badge-pending">Pending</span>;
  };

  return (
    <div className="leave-dashboard">
      {/* Cards */}
      <div className="leave-cards">
  <div className="card">
    <div className="card-title">
      <FaUserMd className="card-icon" />
      <span>Sick Leave</span>
    </div>
    <p>{remainingLeaves.Sick}</p>
  </div>

  <div className="card">
    <div className="card-title">
      <FaUmbrellaBeach className="card-icon" />
      <span>Casual Leave</span>
    </div>
    <p>{remainingLeaves.Casual}</p>
  </div>

  <div className="card">
    <div className="card-title">
      <FaCalendarAlt className="card-icon" />
      <span>Total Leaves</span>
    </div>
    <p>{remainingLeaves.Total}</p>
  </div>
</div>


      {/* Apply Leave Form */}
      <div className="form-section">
        <h2>Apply Leave</h2>
        <div className="inline-leave-form">
          <ApplyLeaveForm onSuccess={fetchLeaves} editingLeave={editingLeave} />
        </div>
      </div>

      {/* Leave History */}
      <div className="history-section">
        <h2>Leave History</h2>
        <div className="filters">
          <div>
            <label>Type:</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="All">All</option>
              <option value="Sick">Sick</option>
              <option value="Casual">Casual</option>
            </select>
          </div>

          <div>
            <label>Status:</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label>From:</label>
            <input type="date" value={filterFromDate} onChange={(e) => setFilterFromDate(e.target.value)} />
          </div>

          <div>
            <label>To:</label>
            <input type="date" value={filterToDate} onChange={(e) => setFilterToDate(e.target.value)} />
          </div>
        </div>

        <div className="history-table">
          <table className="table-style1">
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.leaveType}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{getStatusBadge(leave.status)}</td>
                  <td>
                    <button onClick={() => setEditingLeave(leave)} className="edit-btn">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default LeaveDashboard;
