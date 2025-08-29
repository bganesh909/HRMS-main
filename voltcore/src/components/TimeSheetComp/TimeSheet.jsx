import React, { useState } from 'react';
import './TimeSheet.css'; // Create this CSS file
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
const TimeSheet = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [dateRange, setDateRange] = useState({
    fromDate: '',
    toDate: '',
  });
  const navigate = useNavigate();
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };
  const handleDateChange = (e) => {
    console.log(e.target.value);
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };
  const submitTimeSheet = () => {
    if (dateRange.fromDate && dateRange.toDate) {
      toast('Time Sheet Submitted', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      setIsFormVisible(false);
      setDateRange({fromDate:"",toDate:""})
    } else {
      toast.error('Please Select a date range!', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    }
  };
  return (
    <div className="suti-container">
      <button className="button-57 rpr" role="button" onClick={toggleForm}>
        <span className="text rpr">Time Sheet</span>
        {!isFormVisible ? <span>open</span> : <span>close</span>}
      </button>
 
      <div className={`sub-frm ${isFormVisible ? 'visible' : ''}`}>
        <div className="date-inputs">
          <input type="date" name="fromDate" onChange={(e) => handleDateChange(e)} />
          <input type="date" name="toDate" onChange={(e) => handleDateChange(e)} />
        </div>
        <div className="btn-container">
          <button
            className="button-17 rpr"
            type="submit"
            onClick={() => {
              submitTimeSheet();
            }}
          >
            Submit
          </button>
          <button
            className="button-17 rpr"
            type="submit"
            onClick={() => {
              setIsFormVisible(false);
              navigate('/attendance/myTimeSheet');
            }}
          >
            Edit
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default TimeSheet;
