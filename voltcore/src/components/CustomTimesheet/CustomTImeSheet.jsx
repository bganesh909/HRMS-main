import React, { useEffect, useState } from 'react';
import './CustomTImeSheet.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CirclePlus } from 'lucide-react';
import MoreActionsButton from '../MoreActionsButton/MoreActionsButton';
import AddTimeExpense from '../AddTimeExpense/AddTimeExpense';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import {
  addTimeSheetDetails,
  addTimeExpenseData,
  deleteMyTimeExpense,
  upDateMyTimeExpense,
} from '../../api/services';
import { getDailyLog } from '../../api/services';
import { timeToHours } from '../../lib/utils/timetohours';
import { submitTimeSheet } from '../../api/services';
export const timeSheetFields = [
  'Date',
  'Check In',
  'Check Out',
  'Total Hours',
  'Comments',
  'actions',
];
const actionTypes = [
  { name: 'Edit', action: '' },
  { name: 'Report', action: '' },
  {
    name: 'submit',
    action: async (sessionId) => {
      await submitTimeSheet(sessionId.session_id);
      console.log('Submit Time Sheet data to change status', sessionId.session_id);
    },
  },
];
// const texp = {
//   id: 0,
//   hourSpent: 3,
//   description: 'Doing Research on generative ai',
// };
function CustomTImeSheet() {
  const [timeSheetData, setTimeSheetData] = useState({
    fromDate: '',
    toDate: '',
    data: [],
  });
  const warning = () => {
    toast('Make Sure to save details before exit', {
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
  };
  const location = useLocation();
  const toastHandler = (toastCode, message) => {
    switch (toastCode) {
      case 'w':
        toast.warning(message);
        break;
      case 's':
        toast(message);
        break;
      default:
        break;
    }
    // toast(message)
  };

  const handleDatePick = (e) => {
    console.log('Date Selector-->', e.target.value);
    setTimeSheetData({
      ...timeSheetData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();

  const [openRowIndex, setOpenRowIndex] = useState(null);

  const handleEditClick = (index) => {
    setOpenRowIndex((prev) => (prev === index ? null : index));
  };
  const addTimeExpense = (e, rowId, indexOfInput, cmd) => {
    console.log('inoput index', indexOfInput, rowId);
    if (cmd == 'remove') {
      setTimeSheetData((prev) => ({
        ...prev,
        data: prev.data.map((ele, index) => {
          if (rowId == index) {
            return {
              ...ele,
              timeExpense: ele.timeExpense.filter((timeExp, expInd) => {
                console.log(
                  `expIndex ${expInd},input INdex ${indexOfInput}`,
                  expInd !== indexOfInput
                );
                return expInd !== indexOfInput;
              }),
            };
          } else {
            return ele;
          }
        }),
      }));
      return;
    }
    if (cmd == 'edit') {
      setTimeSheetData((prev) => ({
        ...prev,
        data: prev.data.map((ele, index) => {
          if (rowId == index) {
            return {
              ...ele,
              timeExpense: ele.timeExpense.map((timeExp, expInd) =>
                expInd == indexOfInput
                  ? {
                      ...timeExp,
                      status: false,
                    }
                  : timeExp
              ),
            };
          } else {
            return ele;
          }
        }),
      }));
      return;
    }
    const name = e.target.name;
    const value = e.target.value;
    const myExpenseDetails = {
      name,
      value,
      rowId,
      indexOfInput,
    };
    console.log('Add and delete time expense---->', myExpenseDetails);
    setTimeSheetData((prev) => ({
      ...prev,
      data: prev.data.map((ele, index) => {
        if (rowId == index) {
          return {
            ...ele,
            timeExpense: ele.timeExpense.map((timeExp, expInd) =>
              expInd == indexOfInput
                ? {
                    ...timeExp,
                    [name]: value,
                  }
                : timeExp
            ),
          };
        } else {
          return ele;
        }
      }),
    }));
  };

  const addExpenseItem = (addExpenseToDataIndex) => {
    console.log('Please Add a expense item', addExpenseToDataIndex);
    const myTimeSheetData = [...timeSheetData.data];
    myTimeSheetData[addExpenseToDataIndex].timeExpense.push({
      hourSpent: 0,
      description: '',
      status: false,
    });
    setTimeSheetData({ ...timeSheetData, data: [...myTimeSheetData] });
  };
  const myDailyLog = async (fDate, tDate) => {
    const logs = await getDailyLog({ fromDate: fDate, toDate: tDate });
    const myList = logs.map((item, index) => {
      return {
        id: index,
        session_id: item.id,
        date: new Date(item.clock_in).toLocaleDateString(),
        checkIn: new Date(item.clock_in).toLocaleTimeString(),
        checkOut: item.clock_out ? new Date(item.clock_out).toLocaleTimeString() : '',
        totalHours: item.total_work_time ? timeToHours(item.total_work_time).toFixed(2) : '',
        timeExpense: [
          ...item.timesheet_details.map((expense, index) => {
            return { ...expense, status: true };
          }),
        ],
      };
    });
    console.log('Date Range--->', myList);
    setTimeSheetData({ ...timeSheetData, data: [...myList] });
  };
  const submitTimeSheet = (rowId, indexOfInput) => {
    console.log(`Changing task detail of ${rowId} and expense input ${indexOfInput}`);
    addTimeSheetDetails(timeSheetData);
  };
  const saveTimeExpenseData = async (rowId, indexOfInput) => {
    console.log(`Changing task detail of ${rowId} and expense input ${indexOfInput}`);
    let session = timeSheetData.data.find((ele, index) => rowId == index);
    const loggedTimeCheck = editVsClockedTimeCheck(session);
    if (loggedTimeCheck) {
      toastHandler('w', 'Total hours exceeding logged hours');
      return;
    }
    console.log(`Changed Session-->`);
    if (session.timeExpense[indexOfInput].id) {
      let editExpense = session.timeExpense[indexOfInput];
      console.log('Not newly created');
      const editedLog = upDateMyTimeExpense(rowId, editExpense);
      editedLog && toastHandler('s', 'Sucessfully added to the time log');
      setTimeSheetData((prev) => ({
        ...prev,
        data: prev.data.map((ele, index) => {
          if (rowId == index) {
            return {
              ...ele,
              timeExpense: ele.timeExpense.map((timeExp, expInd) =>
                expInd == indexOfInput
                  ? {
                      ...timeExp,
                      status: editedLog,
                    }
                  : timeExp
              ),
            };
          } else {
            return ele;
          }
        }),
      }));
      return;
    }
    const savedLog = await addTimeExpenseData({
      ...session.timeExpense[indexOfInput],
      session_id: session.session_id,
    });
    if (savedLog.id) {
      setTimeSheetData((prev) => ({
        ...prev,
        data: prev.data.map((ele, index) => {
          if (rowId == index) {
            return {
              ...ele,
              timeExpense: ele.timeExpense.map((timeExp, expInd) =>
                expInd == indexOfInput
                  ? {
                      ...savedLog,
                      status: true,
                    }
                  : timeExp
              ),
            };
          } else {
            return ele;
          }
        }),
      }));
      toastHandler('s', 'Data Added to time sheet');
    }
  };
  const deleteTimeExpense = async (rowId, indexOfInput) => {
    let session = timeSheetData.data.find((ele, index) => rowId == index);
    const sessionId = session.session_id;
    const expenseId = session.timeExpense[indexOfInput].id;
    console.log(`Delete session`, session.session_id, session.timeExpense[indexOfInput].id);
    if (!expenseId) {
      addTimeExpense('', rowId, indexOfInput, 'remove');
      return;
    }
    const status = await deleteMyTimeExpense(sessionId, expenseId);
    if (status) {
      addTimeExpense('', rowId, indexOfInput, 'remove');
      toastHandler('s', 'Deleted time expense from daily log');
      return;
    }
  };
  const getTimeSheet = () => {
    const fDate = timeSheetData.fromDate;
    const tDate = timeSheetData.toDate;
    if (fDate && tDate) {
      myDailyLog(fDate, tDate);
    }
  };
  const editVsClockedTimeCheck = (session) => {
    // console.log(`Session for which time is being added to expense sheet--->`, session);
    let status = false;
    if (session.timeExpense.length > 0) {
      const myArr = session.timeExpense;
      let totalHours = session.timeExpense.reduce(
        (accumulator, currentValue) => accumulator + +currentValue.hourSpent,
        0
      );
      status = totalHours > session.totalHours;
      console.log(`Total Hours Spent --->`, totalHours, status);
      return status;
    }
    return status;
  };
  useEffect(() => {
    const data = location.state;
    console.log(data);
    if (data?.clock_in) {
      let expDate = new Date(data.clock_in);
      let frtDate = `${expDate.getFullYear()}-${String(expDate.getMonth() + 1).padStart(2, '0')}-${expDate.getDate()}`;
      myDailyLog(frtDate, frtDate);
    }
  }, []);
  return (
    <div className="att-container ">
      <div className="flex gap-2 justify-center rsh">
        <ArrowLeft
          onClick={() => {
            warning();
            setTimeout(() => {
              navigate(-1);
            }, 5000);
          }}
        />
        Time Sheet
      </div>
      <div className="atten-sheet card-p">
        <div className="d-pick">
          <div className="rpr block">Pick Range</div>
          <input type="date" name="fromDate" onChange={handleDatePick} />
          <input type="date" name="toDate" onChange={handleDatePick} />
          <button
            onClick={() => {
              getTimeSheet();
            }}
          >
            Get
          </button>
        </div>
        <table className="table-style1">
          <thead>
            <tr className="rpr">
              {timeSheetFields.map((field, index) => (
                <th key={index}>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSheetData.data.map((date, index) => (
              <>
                <tr className="osns">
                  <td>{timeSheetData.data[index]?.date && timeSheetData.data[index].date}</td>

                  <td>{timeSheetData.data[index]?.checkIn && timeSheetData.data[index].checkIn}</td>
                  <td>
                    {timeSheetData.data[index]?.checkOut && timeSheetData.data[index].checkOut}
                  </td>
                  <td>
                    {timeSheetData.data[index]?.totalHours && timeSheetData.data[index].totalHours}
                  </td>
                  <td></td>
                  <td>
                    <MoreActionsButton
                      actionTypes={actionTypes}
                      onEdit={() => handleEditClick(index)}
                      rowData={date}
                    />
                  </td>
                </tr>
                {
                  <tr className="expand-row">
                    <td colSpan={6}>
                      <div
                        colSpan={2}
                        className={`collapsible-container ${openRowIndex === index ? 'open' : ''}`}
                      >
                        <CirclePlus
                          onClick={() => {
                            addExpenseItem(index);
                          }}
                        />
                        {timeSheetData.data[index].timeExpense.map((ele, expindex) => (
                          <AddTimeExpense
                            handleExpenseInput={addTimeExpense}
                            rowId={index}
                            expIndex={expindex}
                            data={timeSheetData.data[index].timeExpense[expindex]}
                            key={expindex}
                            saveTimeExpense={saveTimeExpenseData}
                            deleteTimeExpense={deleteTimeExpense}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                }
              </>
            ))}
          </tbody>
        </table>
        <button className="mrg-tp" onClick={submitTimeSheet}>
          Save
        </button>
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
}
export default CustomTImeSheet;
