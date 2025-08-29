'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import './AttandanceMarker.css';
import { getMySessions } from '../../api/services';
import { timeToHours } from '../../lib/utils/timetohours';

const attendanceData = [
  { date: '4/29/2025', status: 1, checkIn: '9:00AM', checkOut: '5:00PM', totalHours: 8 },
  { date: '4/27/2025', status: 1, checkIn: '9:00AM', checkOut: '5:00PM', totalHours: 8 },
  { date: '4/2/2025', status: 1, checkIn: '9:00AM', checkOut: '5:00PM', totalHours: 8 },
  { date: '4/23/2025', status: 0, checkIn: '', checkOut: '', totalHours: 0 },
  { date: '4/25/2025', status: 1, checkIn: '9:00AM', checkOut: '5:00PM', totalHours: 8 },
];

const AttendanceCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [attendancesData, setAttendancesData] = useState([]);
  const getTileData = (date) => {
    const dateString = format(date, 'M/d/yyyy');
    return attendancesData.find((item) => format(item.clock_in, 'M/d/yyyy') === dateString);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      if(date>new Date()){
        return
      }
      const data = getTileData(date);
      if (data) {
        return (
          <div className="relative group flex justify-center items-center osns">
            {/* Show the date */}
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center bg-[#4CAF50] text-white text-xs p-2 rounded shadow-md whitespace-nowrap z-50 w-[150px] h-[100px] flex justify-center">
              {data.clock_in ? (
                <>
                  <div>Check-in: {format(data.clock_in, 'HH:mm:ss')}</div>
                  <div>Check-out: {data.clock_out ? format(data.clock_out, 'HH:mm:ss') : ''}</div>
                  <div>
                    Hours:{' '}
                    {data.total_work_time ? timeToHours(data.total_work_time).toFixed(2) : ''}
                  </div>
                </>
              ) : (
                <div>Absent</div>
              )}
            </div>
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const data = getTileData(date);
      if (data) {
        return data.status === 1
          ? 'bg-green-500 text-white rounded-lg group present-day'
          : 'bg-red-500 text-white rounded-lg group absent-day';
      }
    }
    return '';
  };
  const fetchEmployeeAttendance = async () => {
    const data = await getMySessions();
    setAttendancesData(data);
  };
  function timeToSeconds(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    // console.log(hours + minutes / 60 + seconds / 3600);
    return hours + minutes / 60 + seconds / 3600;
  }
  useEffect(() => {
    fetchEmployeeAttendance();
  }, []);
  return (
    <div className="p-8 overflow-visible">
      <h1 className="rsh t-cent">Attendance Calendar</h1>
      <div className="overflow-visible relative">
        <Calendar
          onChange={setValue}
          value={value}
          tileClassName={tileClassName}
          tileContent={tileContent}
        />
      </div>
    </div>
  );
};

export default AttendanceCalendar;
