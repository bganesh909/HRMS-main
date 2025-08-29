import React from 'react';
import './HolidayList.css';
function HolidayList({ holidayList }) {
  //   const tableColumns = ['date', 'name'];
  return (
    <div className="card-p hlist-cont">
      <div className="rsh t-cent">Holiday List</div>
      <div className="table-container">
        <table className="scrollable-table osns">
          <thead>
            <tr>
              <th> Date</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {holidayList.map((data, index) => (
              <tr key={index}>
                <td>{data.date}</td>
                <td>{data.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HolidayList;
