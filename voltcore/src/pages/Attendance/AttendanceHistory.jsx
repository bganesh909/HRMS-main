import React, { useState } from 'react';
import './AttendanceHistory.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const attendanceTrendData = [
  { month: 'Jan', team: 'Team A', present: 25, absent: 3, wfh: 2 },
  { month: 'Jan', team: 'Team B', present: 20, absent: 5, wfh: 5 },
  { month: 'Jan', team: 'Team C', present: 22, absent: 4, wfh: 4 },
  { month: 'Jan', team: 'Team D', present: 18, absent: 6, wfh: 6 },
  { month: 'Feb', team: 'Team A', present: 26, absent: 2, wfh: 2 },
  { month: 'Feb', team: 'Team B', present: 21, absent: 4, wfh: 5 },
  { month: 'Feb', team: 'Team C', present: 23, absent: 3, wfh: 4 },
  { month: 'Feb', team: 'Team D', present: 19, absent: 5, wfh: 6 },
  { month: 'Mar', team: 'Team A', present: 24, absent: 3, wfh: 3 },
  { month: 'Mar', team: 'Team B', present: 22, absent: 4, wfh: 4 },
  { month: 'Mar', team: 'Team C', present: 21, absent: 5, wfh: 4 },
  { month: 'Mar', team: 'Team D', present: 20, absent: 6, wfh: 4 },
  { month: 'Apr', team: 'Team A', present: 25, absent: 2, wfh: 3 },
  { month: 'Apr', team: 'Team B', present: 23, absent: 3, wfh: 4 },
  { month: 'Apr', team: 'Team C', present: 22, absent: 3, wfh: 5 },
  { month: 'Apr', team: 'Team D', present: 21, absent: 4, wfh: 5 },
  { month: 'May', team: 'Team A', present: 26, absent: 1, wfh: 3 },
  { month: 'May', team: 'Team B', present: 24, absent: 2, wfh: 4 },
  { month: 'May', team: 'Team C', present: 23, absent: 3, wfh: 4 },
  { month: 'May', team: 'Team D', present: 22, absent: 3, wfh: 5 },
  { month: 'Jun', team: 'Team A', present: 27, absent: 1, wfh: 2 },
  { month: 'Jun', team: 'Team B', present: 25, absent: 2, wfh: 3 },
  { month: 'Jun', team: 'Team C', present: 24, absent: 2, wfh: 4 },
  { month: 'Jun', team: 'Team D', present: 23, absent: 3, wfh: 4 },
];

const absenteeismData = [
  { month: 'Jan', rate: 0.2 },
  { month: 'Feb', rate: 0.18 },
  { month: 'Mar', rate: 0.25 },
  { month: 'Apr', rate: 0.21 },
  { month: 'May', rate: 0.27 },
  { month: 'Jun', rate: 0.3 },
];

const locationData = [
  { name: 'Home', value: 44.73 },
  { name: 'Office', value: 55.27 },
];

const tableData = Array.from({ length: 30 }, (_, i) => {
  const names = [
    'Bhavish Kanna',
    'John Doe',
    'Ava Smith',
    'Liam Brown',
    'Olivia White',
    'Mia Turner',
    'Lucas Davis',
    'Emma Wilson',
    'James Taylor',
    'Sophia Moore',
  ];
  const teams = ['Team A', 'Team B', 'Team C', 'Team D'];
  const statuses = ['Present', 'WFH', 'Absent'];
  return {
    employee: names[i % names.length],
    team: teams[i % teams.length],
    status: statuses[i % statuses.length],
    hours: (Math.random() * 2 + 5).toFixed(1),
    date: `2025-05-${(30 - i).toString().padStart(2, '0')}`,
  };
});

const COLORS = ['#8884d8', '#82ca9d'];

const AttendanceHistory = () => {
  const [filters, setFilters] = useState({ from: '', to: '', team: 'all', search: '' });
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setPage(1);
  };

  const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const groupedData = monthsOrder.map((month) => {
    const monthlyEntries = attendanceTrendData.filter((entry) => entry.month === month);
    const monthObj = { month };
    monthlyEntries.forEach((entry) => {
      monthObj[`${entry.team}_present`] = entry.present;
      monthObj[`${entry.team}_absent`] = entry.absent;
      monthObj[`${entry.team}_wfh`] = entry.wfh;
    });
    return monthObj;
  });

  const filteredTableData = tableData.filter((entry) => {
    const fromDate = filters.from ? new Date(filters.from) : null;
    const toDate = filters.to ? new Date(filters.to) : null;
    const entryDate = new Date(entry.date);
    return (
      (!fromDate || entryDate >= fromDate) &&
      (!toDate || entryDate <= toDate) &&
      (filters.team === 'all' || entry.team === filters.team) &&
      (filters.search === '' || entry.employee.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const paginatedData = filteredTableData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(filteredTableData.length / rowsPerPage);

  return (
    <div className="attendance-history-container">
      <div className="attendance-topbar">
        <div className="date-filter-box">
          <label>From Date</label>
          <input type="date" name="from" value={filters.from} onChange={handleChange} />
        </div>
        <div className="date-filter-box">
          <label>To Date</label>
          <input type="date" name="to" value={filters.to} onChange={handleChange} />
        </div>
        <div className="date-filter-box">
          <label>Team</label>
          <select name="team" value={filters.team} onChange={handleChange}>
            <option value="all">All</option>
            {[...new Set(tableData.map((emp) => emp.team))].map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
        <div className="date-filter-box">
          <label>Search Employee</label>
          <input
            type="text"
            name="search"
            placeholder="Search Employee"
            value={filters.search}
            onChange={handleChange}
          />
        </div>
        <div className="summary-card">
          <h4>Unapproved Leave</h4>
          <p>59</p>
        </div>
        <div className="summary-card">
          <h4>Absences</h4>
          <p>241</p>
        </div>
      </div>

      <div className="attendance-kpi-cards">
        {[
          ['Total Present', '124'],
          ['Total WFH', '38'],
          ['Total Absent', '15'],
          ['Avg. Attendance', '82.6%'],
          ['Avg. WFH', '23.4%'],
          ['Avg. Absenteeism', '3.1%'],
        ].map(([label, value]) => (
          <div className="kpi-card" key={label}>
            <h3>{label}</h3>
            <p>{value}</p>
          </div>
        ))}
      </div>

      <div className="attendance-charts">
        <div className="chart-box">
          <div className="chart-title">Attendance by Status (per Team)</div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={groupedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              {['Team A', 'Team B', 'Team C', 'Team D'].flatMap((team) => [
                <Line
                  key={`${team}_present`}
                  type="monotone"
                  dataKey={`${team}_present`}
                  stroke="#0088FE"
                  name={`${team} - Present`}
                />,
                <Line
                  key={`${team}_absent`}
                  type="monotone"
                  dataKey={`${team}_absent`}
                  stroke="#FF8042"
                  name={`${team} - Absent`}
                />,
                <Line
                  key={`${team}_wfh`}
                  type="monotone"
                  dataKey={`${team}_wfh`}
                  stroke="#00C49F"
                  name={`${team} - WFH`}
                />,
              ])}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <div className="chart-title">Absenteeism Rate</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={absenteeismData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip cursor={{ fill: 'none' }} />
              <Bar dataKey="rate" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <div className="chart-title">Work Location Breakdown</div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={locationData} dataKey="value" nameKey="name" outerRadius={80} label>
                {locationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="attendance-table">
        <table className="table-style1">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Team</th>
              <th>Status</th>
              <th>Hours Worked</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.employee}</td>
                <td>{row.team}</td>
                <td>{row.status}</td>
                <td>{row.hours}</td>
                <td>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-controls">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistory;
