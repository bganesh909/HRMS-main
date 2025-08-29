import React, { useState, useEffect } from 'react';
import './SubmittedTimeSheetList.css';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import ActionMenu from '../MoreActionsButton/MoreActionsButton';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { getDailyLogForTimeSheet } from '../../api/services';
import { timeToHours } from '../../lib/utils/timetohours';
import { useNavigate } from 'react-router-dom';
import { submitTimeSheet } from '../../api/services';
const fetchServerData = async (pageIndex, pageSize) => {
  // Replace this with your actual API call
  // Simulated response
  const allData = Array.from({ length: 42 }, (_, i) => ({
    id: `LA${i + 1}`,
    appliedDate: '2024-05-20',
    fromDate: '2024-11-01',
    toDate: '2024-11-03',
    status: i % 2 === 0 ? 'approved' : i % 3 == 0 ? 'pending' : 'rejected',
  }));

  const start = pageIndex * pageSize;
  const end = start + pageSize;
  return {
    rows: allData.slice(start, end),
    total: allData.length,
  };
};

const SubmittedTimeSheetList = () => {
  const navigate = useNavigate();
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Clock-in',
      accessorKey: 'clock_in',
      cell: (info) => {
        const data = new Date(info.getValue()).toLocaleTimeString();
        console.log(`tanstack query table--`, data);
        return <span>{data}</span>;
      },
    },
    {
      header: 'Clock-out',
      accessorKey: 'clock_out',
      cell: (info) => {
        const data = new Date(info.getValue()).toLocaleTimeString();
        console.log(`tanstack query table--`, data);
        return <span>{data}</span>;
      },
    },
    {
      header: 'Logged hours',
      accessorKey: 'total_work_time',
      cell: (info) => {
        console.log(info.getValue());
        const data = info.getValue() ? timeToHours(info.getValue()).toFixed(2) : '';
        console.log(`tanstack query table--`, data);
        return <span>{data}</span>;
      },
    },
    {
      header: 'Status',
      accessorKey: 'approval_status',
      cell: (info) => {
        const status = info.getValue() ? info.getValue().toLowerCase() : '';
        let className = '';
        if (status === 'pending') className = 'sts-p';
        else if (status === 'approved') className = 'sts-a';
        else if (status === 'rejected') className = 'sts-r';
        else if (status === 'submitted') className = 'sts-s';

        return <span className={className}>{status}</span>;
      },
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => {
        //   const rowData = row.original;

        return (
          <div className="flex space-x-2">
            <ActionMenu
              actionTypes={actionTypes}
              onEdit={() => handleEditClick(row.id)}
              rowData={row}
            />
          </div>
        );
      },
    },
  ];
  const actionTypes = [
    {
      name: 'Add time expense',
      action: (id) => {
        console.log(`Time Sheet id to be submitted-->`, id.original);
        navigate('/attendance/myTimeSheet', { state: id.original });
      },
    },
    {
      name: 'Submit Expense',
      action:async (id) => {
        await submitTimeSheet(id.original.id);
        toast('You time sheet has been resubmitted', {
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
      },
    },
  ];
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });
  const [openRowIndex, setOpenRowIndex] = useState(null);

  const handleEditClick = (index) => {
    setOpenRowIndex((prev) => (prev === index ? null : index));
  };
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetchServerData(pagination.pageIndex, pagination.pageSize);
      setData(res.rows);
      setPageCount(Math.ceil(res.total / pagination.pageSize));
      setLoading(false);
    };
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize]);
  const dailyLog = async () => {
    const logs = await getDailyLogForTimeSheet();
    console.log(`Attendence Menu daily logs`, logs);
    setData([...logs]);
  };
  useEffect(() => {
    dailyLog();
  }, []);
  return (
    <div className="timesheet-list-container p-4">
      <table className="table-style1">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="rpr">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="osns">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={`text-center`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center" style={{ marginTop: '10px' }}>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {pagination.pageIndex + 1} of {pageCount}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
        <input
          type="number"
          min={1}
          max={pageCount}
          placeholder="Go to page..."
          className="border px-2 py-1 rounded w-24"
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            if (page >= 0 && page < pageCount) {
              table.setPageIndex(page);
            }
          }}
          style={{ width: '100px' }}
        />
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

export default SubmittedTimeSheetList;
