import React from 'react';
import { availableHolidayList } from '../lib/placeholder';
import HolidayList from '../components/HolidayList/HolidayList';
import { Details } from '@mui/icons-material';
import AttandanceMarker from '../components/Calender/AttandanceMarker';
import TimeSheet from '../components/TimeSheetComp/TimeSheet';
import SubmittedTimeSheetList from '../components/AttendanceComponents/SubmittedTimeSheetList';
function Attendance() {
  return (
    <div className="att-container">
      <div className="action-section">
        <TimeSheet />
      </div>
      <div className="att-s2">
        <HolidayList holidayList={availableHolidayList} />
        <div className="card-p ">
          <AttandanceMarker />
        </div>
      </div>
      <div className='card-p w-[100%] overflow-scroll'>
        <SubmittedTimeSheetList />
      </div>
    </div>
  );
}

export default Attendance;
