import React, { useState, useEffect, useCallback } from 'react';
import './AttendanceOverview.css'; // Your existing CSS
import { FaCheckCircle, FaUserSlash, FaClock } from 'react-icons/fa'; // Removed FaSearch as it's not used for an icon here
import { BsFileSpreadsheetFill } from "react-icons/bs";
import { format } from 'date-fns';

// Import the new services
import { getAttendanceOverviewData, getTeams } from '../../api/services'; // Adjust path if services.js is elsewhere

const formatTimeToAMPM = (dateTimeString) => {
  if (!dateTimeString) return 'N/A';
  try {
    const dateObj = new Date(dateTimeString);
    if (isNaN(dateObj.getTime())) return 'Invalid Time';
    return format(dateObj, 'hh:mm:ss a');
  } catch (e) {
    console.error("Error formatting time:", e, "Input:", dateTimeString);
    return 'Invalid Time';
  }
};

const formatDateForDisplay = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    try {
      const dateObj = new Date(dateTimeString);
      if (isNaN(dateObj.getTime())) return 'Invalid Date';
      return format(dateObj, 'MMM dd, yyyy');
    } catch (e) {
      console.error("Error formatting date:", e, "Input:", dateTimeString);
      return 'Invalid Date';
    }
  };

const formatDurationFromSeconds = (totalSeconds) => {
  if (totalSeconds === null || totalSeconds === undefined || totalSeconds < 0) return '0h 0m';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};


function AttendanceOverview () {
    const [attendanceTableData, setAttendanceTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [teamsList, setTeamsList] = useState([]); 

    const [activeFilters, setActiveFilters] = useState({
        date: format(new Date(), 'yyyy-MM-dd'), 
        department_id: '', 
        search: '',
    });
    const [expandedRowIds, setExpandedRowIds] = useState({}); 

    const [statTotalPresent, setStatTotalPresent] = useState(0);
    const [statTotalAbsent, setStatTotalAbsent] = useState(0);
    const [statAvgCheckInTime, setStatAvgCheckInTime] = useState('N/A'); 

    // --- Data Fetching Logic ---
    // Use useCallback for functions passed as dependencies to useEffect or event handlers if they cause re-renders
    const loadAttendanceData = useCallback(() => {
        setIsLoading(true);
        setFetchError(null);
        getAttendanceOverviewData(activeFilters)
            .then((responseData) => {
                const empData = responseData.employee_attendance_list || [];
                setAttendanceTableData(empData);

                if (responseData.summary_stats && responseData.summary_stats.average_check_in_time) {
                    setStatAvgCheckInTime(responseData.summary_stats.average_check_in_time);
                } else {
                    setStatAvgCheckInTime('N/A'); // If no data or no one present
                }

                if (responseData.summary_stats && responseData.summary_stats.total_present) {
                    setStatTotalPresent(responseData.summary_stats.total_present);
                } else {
                    setStatTotalPresent(0); // If no data or no one present
                }

                if (responseData.summary_stats && responseData.summary_stats.total_absent) {
                    setStatTotalAbsent(responseData.summary_stats.total_absent);
                } else {
                    setStatTotalAbsent(0); // If no data or no one present
                }

            })
            .catch((error) => {
                console.error("Attendance overview fetch failed: ", error);
                setFetchError(error.detail || error.message || "Failed to load attendance data.");
                setAttendanceTableData([]);
                setStatAvgCheckInTime('N/A');
                setStatTotalPresent(0);
                setStatTotalAbsent(0);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [activeFilters]); // Dependency: activeFilters

    useEffect(() => {
        loadAttendanceData();
    }, [loadAttendanceData]); // This effect runs when loadAttendanceData (due to activeFilters change) is re-created

    useEffect(() => {
        // Fetch teams for the department filter dropdown
        getTeams()
            .then((data) => {
                setTeamsList(data);
            })
            .catch((error) => {
                console.error("Teams list fetch failed: ", error);
                // Optionally set an error state for team loading
            });
    }, []); // Run once on component mount

    // --- Event Handlers ---
    const handleFilterInputChange = (e) => {
        const { name, value } = e.target;
        setActiveFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };
    
    const toggleRowExpansion = (employeeId) => {
        setExpandedRowIds(prevExpanded => ({
            ...prevExpanded,
            [employeeId]: !prevExpanded[employeeId],
        }));
    };

    // --- Sub-component for Stat Cards ---
    const AttendanceStatCard = (props) => {
        return (
            <div className='att-ov-stat-card card-p osns'>
                <div className='att-ov-stat-header'>
                    {props.icon}
                    <p>{props.title}</p>
                </div>
                <div className='att-ov-stat-value'>
                    <p>{props.value}</p>
                </div>
            </div>
        );
    };

    // --- Render Logic ---
    return (
        <div className="att-ov-content-wrapper page-layout-container">
            <header>
                <h2 className='rsh'>Attendance Overview</h2>
                <hr className='color-grey' />
            </header>

            <div className='att-ov-filters'>
                <div className='att-ov-dept-date'>
                    <select 
                        name="department_id" 
                        value={activeFilters.department_id} 
                        onChange={handleFilterInputChange}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px' }}
                        aria-label="Select Team"
                    >
                        <option value="">All Teams</option>
                        {teamsList.map(team => (
                            <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                    </select>
                    <input 
                        type="date" 
                        name="date" 
                        value={activeFilters.date} 
                        onChange={handleFilterInputChange} 
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        aria-label="Select Date"
                    />
                </div>
                <div className='att-ov-search-query'>
                    <input 
                        type="text"
                        name="search"
                        placeholder="Search Employee ID/Name/Email"
                        value={activeFilters.search}
                        onChange={handleFilterInputChange}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '200px' }}
                        aria-label="Search Employee"
                    />
                </div>
            </div>

            <section className='att-ov-stats-container osns'>
                <AttendanceStatCard title='Total Employees Present' icon={<FaCheckCircle />} value={isLoading ? '...' : statTotalPresent} />
                <AttendanceStatCard title='Employees Absent' icon={<FaUserSlash />}  value={isLoading ? '...' : statTotalAbsent} />
                <AttendanceStatCard title='Average Check-In Time' icon={<FaClock />}  value={isLoading ? '...' : statAvgCheckInTime} />
            </section>

            <section className='att-ov-clockinout-table-container osns'>
                <header>
                    <BsFileSpreadsheetFill />
                    <p>Attendance History</p>
                </header>

                {isLoading && <p style={{ textAlign: 'center', padding: '20px' }}>Loading attendance data...</p>}
                {fetchError && <p style={{ color: 'red', textAlign: 'center', padding: '20px' }}>Error: {fetchError}</p>}
                {!isLoading && !fetchError && (
                    <table className='table-style1'>
                        <thead>
                            <tr>
                                <th style={{ width: '30px' }}></th> {/* Expand Icon */}
                                <th>ID</th>
                                <th>Name</th>
                                <th>Team</th>
                                <th>Recent Clock-In</th>
                                <th>Recent Clock-Out</th>
                                <th>Total Hours</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceTableData.length > 0 ? attendanceTableData.map(emp => (
                                <React.Fragment key={emp.employee_id}>
                                    <tr 
                                        onClick={() => emp.sessions && emp.sessions.length > 0 && toggleRowExpansion(emp.employee_id)} 
                                        style={{ cursor: (emp.sessions && emp.sessions.length > 0) ? 'pointer' : 'default' }}
                                        className={expandedRowIds[emp.employee_id] ? 'expanded-row-active' : ''}
                                    >
                                        <td>
                                            {emp.sessions && emp.sessions.length > 0 ? (expandedRowIds[emp.employee_id] ? '▼' : '►') : ''}
                                        </td>
                                        <td>{emp.employee_id}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.department_name || 'N/A'}</td>
                                        <td>{formatTimeToAMPM(emp.most_recent_clock_in)}</td>
                                        <td>{formatTimeToAMPM(emp.most_recent_clock_out)}</td>
                                        <td>{formatDurationFromSeconds(emp.total_daily_worked_seconds)}</td>
                                        <td style={{ color: emp.status === 'Absent' ? '#dc3545' : '#28a745', fontWeight: 'bold' }}>
                                            {emp.status}
                                        </td>
                                    </tr>
                                    {expandedRowIds[emp.employee_id] && emp.sessions && emp.sessions.length > 0 && (
                                        <tr className="expanded-details-row">
                                            <td colSpan="8">
                                                <div className='att-ov-exp-table-container'>
                                                    <strong style={{ display: 'block', marginBottom: '8px' }}>
                                                        Sessions for {emp.name} on {formatDateForDisplay(activeFilters.date)}:
                                                    </strong>
                                                    <table className="table-style1">
                                                        <thead>
                                                            <tr>
                                                                <th>Clock-In</th>
                                                                <th>Clock-Out</th>
                                                                <th>Duration</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {emp.sessions.map((session, index) => (
                                                                <tr key={index}>
                                                                    <td>{formatTimeToAMPM(session.clock_in)}</td>
                                                                    <td>{formatTimeToAMPM(session.clock_out)}</td>
                                                                    <td>{formatDurationFromSeconds(session.total_work_time_seconds)}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>No attendance data found for the selected criteria.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}

export default AttendanceOverview;