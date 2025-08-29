import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./LeaveManagement.css";
import { getCsrfToken } from "../../context/AuthContext/AuthContext";

Modal.setAppElement("#root");

function LeaveManagement() {
  const [stats, setStats] = useState({ onLeave: 0, wfh: 0, present: 0 });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDept, setSelectedDept] = useState("All");
  const [modalData, setModalData] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveInfo, setLeaveInfo] = useState({});
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const itemsPerPage = 5;



  const API_BASE = "http://localhost:8000";

  useEffect(() => {
    fetch(`${API_BASE}/api/total-users/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
      setTotalUsers(data.total_users);
    })
    .catch(err => console.error("Failed to fetch total users:", err));
  
    fetch(`${API_BASE}/api/leave-requests/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
      console.log('fetched leave requests data: ', data);
      if (Array.isArray(data)) {
        setLeaveRequests(data);
        buildLeaveInfo(data);
      } else {
        setLeaveRequests([]);
      }
    })
    .catch(err => console.error("Failed to fetch leaves:", err));
  }, [refresh]);
  

  useEffect(() => {
    if (totalUsers > 0 && selectedDate) {
      const newStats = calculateStats(leaveRequests, totalUsers, selectedDate);
      setStats(newStats);
    }
  }, [leaveRequests, totalUsers, selectedDate]);
  
  const calculateStats = (requests, totalUsers, date) => {
    const currentDate = date.toISOString().split("T")[0];
  
    const isOnDate = (start, end) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      return new Date(currentDate) >= startDate && new Date(currentDate) <= endDate;
    };
  
    const onLeave = requests.filter(
      r => r.status === "Approved" && r.type !== "WFH" && isOnDate(r.startDate, r.endDate)
    ).length;
  
    const wfh = requests.filter(
      r => r.status === "Approved" && r.type === "WFH" && isOnDate(r.startDate, r.endDate)
    ).length;
  
    const present = totalUsers - onLeave - wfh;
    return { onLeave, wfh, present };
  };
  
  
  const buildLeaveInfo = (requests) => {
    const info = {};
    requests.forEach(req => {
      let current = new Date(req.startDate);
      const end = new Date(req.endDate);
      while (current <= end) {
        const dateStr = current.toISOString().split("T")[0];
        if (!info[dateStr]) info[dateStr] = [];
        info[dateStr].push(`${req.user_email} (${req.leaveType})`);
        current.setDate(current.getDate() + 1);
      }
    });
    setLeaveInfo(info);
  };

  const departments = [...new Set(leaveRequests.map(req => (req.department || "General").trim()))];
  

  const isWithinDateRange = (req) => {
    if (!startDate || !endDate) return true;
  
    
    const rangeStart = new Date(startDate);
    const rangeEnd = new Date(endDate);
    const leaveStart = new Date(req.startDate);
    const leaveEnd = new Date(req.endDate);
  
    // Include if the leave overlaps with selected date range
    return leaveStart <= rangeEnd && leaveEnd >= rangeStart;
  };
  

  const filteredRequests = leaveRequests.filter(req =>
    (selectedDept === "All" || req.department === selectedDept) &&
    isWithinDateRange(req) &&
    (nameFilter.trim() === "" ||
    req.user_email.toLowerCase().includes(nameFilter.toLowerCase()) ||
    req.user_name?.toLowerCase().includes(nameFilter.toLowerCase()))
  );

  const leaveDates = Object.keys(leaveInfo).filter(date =>
    leaveInfo[date].some(info => !info.includes("WFH"))
  );
  const wfhDates = Object.keys(leaveInfo).filter(date =>
    leaveInfo[date].some(info => info.includes("WFH"))
  );

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const d = date.toISOString().split("T")[0];
      if (wfhDates.includes(d)) return "wfh-day";
      if (leaveDates.includes(d)) return "leave-day";
    }
    return null;
  };

  const handleDecision = (id, newStatus) => {
    getCsrfToken().then((csrf) => {
      return  fetch(`${API_BASE}/api/leave-requests/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': csrf,
      },
      body: JSON.stringify({ status: newStatus }),
      credentials: "include"
    })
    })
    .then(res => res.json())
    .then(data => {
      console.log('data from patch: ', data)
      setRefresh(prev => !prev);
    })
    .catch(err => console.error("Error updating status:", err));
  };

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const exportToCSV = (data, filename) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row => Object.values(row).join(","));
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const attendanceData = [
    { day: 'Mon', Present: 70, Absent: 10, WFH: 5 },
    { day: 'Tue', Present: 72, Absent: 8, WFH: 6 },
    { day: 'Wed', Present: 65, Absent: 12, WFH: 10 },
    { day: 'Thu', Present: 80, Absent: 5, WFH: 2 },
    { day: 'Fri', Present: 75, Absent: 8, WFH: 3 }
  ];

  return (
    <div className="leave-management-container">
      <h1>Organization Leave Dashboard</h1>

      <div className="stats-cards">
        <div className="card">Employees on Leave: {stats.onLeave}</div>
        <div className="card">Employees WFH: {stats.wfh}</div>
        <div className="card">Total Employees Present: {stats.present}</div>
      </div>
      <div className="section">
        <h2>Employee Leave Requests</h2>
        <div className="filter-bar">
        <div>
    <label>Name:</label>
    <input
      type="text"
      value={nameFilter}
      onChange={e => setNameFilter(e.target.value)}
      placeholder="Search by name or email"
    />
  </div>
  <div>
    <label>Department:</label>
    <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)}>
      <option value="All">All</option>
      {departments.map(dept => (
        <option key={dept} value={dept}>{dept}</option>
      ))}
    </select>
  </div>

  <div>
    <label>Date From:</label>
    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
  </div>

  <div>
    <label>To:</label>
    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
  </div>
</div>

<table className="table-style1">
  <thead>
    <tr>
      <th>Name</th>
      <th>Department</th>
      <th>Leave Type</th>
      <th>From</th>
      <th>To</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {paginatedRequests.length > 0 ? (
      paginatedRequests.map((req, index) => (
        <tr key={`${req.id}-${req.user_email}-${req.startDate}`}>
          <td><button className="link-button" onClick={() => setModalData(req)}>{req.user_email}</button></td>
          <td>{req.department}</td>
          <td>{req.leaveType}</td>
          <td>{req.startDate}</td>
          <td>{req.endDate}</td>
          <td>{req.status}</td>
          <td>
            {req.status === "Pending" ? (
              <>
                <button className="btn-approve" onClick={() => handleDecision(req.id, "Approved")}>Approve</button>
                <button className="btn-reject"  onClick={() => handleDecision(req.id, "Rejected")}>Reject</button>
              </>
            ) : <span>{req.status.toLowerCase()}</span>}
          </td>
        </tr>
      ))
    ) : (
      <tr><td colSpan="7">No leave requests found for selected filters.</td></tr>
    )}
  </tbody>

  <tfoot>
    <tr>
    <td colSpan="7" className="pagination-footer">
       {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`page-button ${page === currentPage ? "active" : ""}`}
          >
            {page}
          </button>
        ))}
      </td>    
    </tr>
  </tfoot>
</table>

        <button className="export-btn" onClick={() => exportToCSV(filteredRequests, "leave-requests.csv")}>Export Leave Requests</button>
      </div>
      <div className="section calendar-chart-section">
        <div className="calendar-box">
          <h2>Organization Calendar Overview</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={tileClassName}
          />
          <div className="calendar-tooltip">
            <strong>{selectedDate.toISOString().split("T")[0]}</strong><br />
            {leaveInfo[selectedDate.toISOString().split("T")[0]]?.join(", ") || "No entries"}
          </div>
          <div className="calendar-legend">
            <div><span className="legend-box leave"></span> On Leave (Red)</div>
            <div><span className="legend-box wfh"></span> Work From Home (Blue)</div>
          </div>
        </div>

        <div className="chart-box">
          <h2>Weekly Attendance Summary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Present" fill="#4caf50" />
              <Bar dataKey="Absent" fill="#f44336" />
              <Bar dataKey="WFH" fill="#2196f3" />
            </BarChart>
          </ResponsiveContainer>
          <button className="export-btn" onClick={() => exportToCSV(attendanceData, "attendance-summary.csv")}>Export Attendance Data</button>
        </div>
      </div>

      <Modal isOpen={!!modalData} onRequestClose={() => setModalData(null)} contentLabel="Leave Detail" className="leave-modal">
        <h2>Leave Request Details</h2>
        {modalData && (
          <div className="modal-content">
            <p><strong>Name:</strong> {modalData.user_email}</p>
            <p><strong>Department:</strong> {modalData.department}</p>
            <p><strong>Type:</strong> {modalData.leaveType}</p>
            <p><strong>From:</strong> {modalData.startDate}</p>
            <p><strong>To:</strong> {modalData.endDate}</p>
            <p><strong>Status:</strong> {modalData.status}</p>
          </div>
        )}
        <button onClick={() => setModalData(null)} className="modal-close-btn">Close</button>
      </Modal>
    </div>
  );
}
export default LeaveManagement;
