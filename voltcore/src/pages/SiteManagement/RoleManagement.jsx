import React, { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Edit } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

import {
  getEmployeesWithRoles,
  getAllSystemRoles,
  updateEmployeeRole,
} from '../../api/services';

import "./RoleManagement.css";

Modal.setAppElement('#root');

function RoleManagement() {
  const [employeesWithRoles, setEmployeesWithRoles] = useState([]);
  const [systemRoles, setSystemRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [selectedRoleId, setSelectedRoleId] = useState('');

  const fetchAllRoleData = async () => {
    setLoading(true);
    try {
      const [empRolesData, rolesData] = await Promise.all([
        getEmployeesWithRoles(),
        getAllSystemRoles(),
      ]);
      setEmployeesWithRoles(empRolesData || []);
      setSystemRoles(rolesData || []);
    } catch (error) {
      toast.error('Failed to fetch role management data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRoleData();
  }, []);

  const openRoleModal = (employee) => {
    setCurrentEmployee(employee);
    setSelectedRoleId(employee.role); // `employee.role` from serializer is the ID
    setIsRoleModalOpen(true);
  };

  const closeRoleModal = () => {
    setIsRoleModalOpen(false);
    setCurrentEmployee(null);
    setSelectedRoleId('');
  };

  const handleRoleChangeSubmit = async (e) => {
    e.preventDefault();
    if (!currentEmployee || !selectedRoleId) {
      toast.warn('Please select an employee and a role.');
      return;
    }
    setLoading(true);
    try {
      await updateEmployeeRole(currentEmployee.id, selectedRoleId);
      toast.success(`Role updated for ${currentEmployee.user_full_name}.`);
      fetchAllRoleData();
      closeRoleModal();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to update employee role.');
    } finally {
      setLoading(false);
    }
  };
  
  const columns = useMemo(() => [
    { header: 'Emp. ID', accessorKey: 'employee_id', size: 100 },
    { header: 'Full Name', accessorKey: 'user_full_name', size: 250 },
    { header: 'Email', accessorKey: 'user_email', size: 250 },
    { header: 'Current Role', accessorKey: 'role_name', size: 150 }, // 'role_name' from EmployeeWithRoleSerializer
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className='rm_action-button' onClick={() => openRoleModal(row.original)} title="Change Role">
            <Edit size={18} color="#007bff" />
          </button>
        </div>
      ),
      size: 100,
    },
  ], []);

  const table = useReactTable({
    data: employeesWithRoles,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="rm_content-wrapper page-layout-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="rm_header">
        <h2 className='rsh'>User Role Management</h2>
        {/* No create button as roles are system-defined for now */}
      </div>

      {loading && <p>Loading employee roles...</p>}
      {!loading && (
        <>
          <table className="table-style1">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="rpr" style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="osns">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} style={{ width: cell.column.getSize() !== 150 ? cell.column.getSize() : undefined }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
           {table.getPageCount() > 1 && (
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              <button className='rm_button' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>«</button>
              <button className='rm_button' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>‹</button>
              <span> Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} </span>
              <button className='rm_button' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>›</button>
              <button className='rm_button' onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>»</button>
            </div>
          )}
        </>
      )}

      <Modal isOpen={isRoleModalOpen} onRequestClose={closeRoleModal} className='rm_modal-content' overlayClassName='rm_modal-overlay' contentLabel="Change Role Form">
        <h3 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Change Role for {currentEmployee?.user_full_name}</h3>
        <form onSubmit={handleRoleChangeSubmit}>
          <div>
            <p><strong>Employee:</strong> {currentEmployee?.user_full_name} ({currentEmployee?.employee_id})</p>
            <p><strong>Current Role:</strong> {currentEmployee?.role_name}</p>
          </div>
          <div style={{marginTop: '1rem'}}>
            <label className='rm_form-label' htmlFor="roleId">New Role:</label>
            <select className='rm_form-input' id="roleId" value={selectedRoleId} onChange={(e) => setSelectedRoleId(e.target.value)} required>
              <option value="">-- Select New Role --</option>
              {systemRoles.map(role => (
                <option key={role.id} value={role.id}>{role.get_name_display}</option>
              ))}
            </select>
          </div>
          <div className='rm_modal-actions'>
            <button type="button" className='rm_button' onClick={closeRoleModal}>Cancel</button>
            <button type="submit" className='rm_button rm_button-update' disabled={loading || !selectedRoleId}>
              {loading ? 'Updating...' : 'Update Role'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default RoleManagement;