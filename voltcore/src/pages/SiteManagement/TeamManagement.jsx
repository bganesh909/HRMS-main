import React, { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { PlusCircle, Edit, Trash2, UserCog, UserPlus, Users, XCircle, CheckCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

import {
  getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  setTeamManager,
  addTeamMember,
  removeTeamMember,
  getAllEmployeesSimple,
} from '../../api/services';

import "./TeamManagement.css";

Modal.setAppElement('#root');

function TeamManagement() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [teamFormData, setTeamFormData] = useState({ name: '', active: true });

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [teamsData, employeesData] = await Promise.all([
        getAllTeams(),
        getAllEmployeesSimple(),
      ]);
      setTeams(teamsData || []);
      setAllEmployees(employeesData || []);
    } catch (error) {
      toast.error('Failed to fetch initial data for teams.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const openTeamModal = (team = null) => {
    setCurrentTeam(team);
    setTeamFormData(team ? { name: team.name, active: team.active } : { name: '', active: true });
    setIsTeamModalOpen(true);
  };
  const closeTeamModal = () => {
    setIsTeamModalOpen(false);
    setCurrentTeam(null);
    setTeamFormData({ name: '', active: true });
  };

  const openManagerModal = (team) => {
    setCurrentTeam(team);
    setSelectedEmployeeId(team.manager ? team.manager.id : '');
    setIsManagerModalOpen(true);
  };
  const closeManagerModal = () => setIsManagerModalOpen(false);

  const openMembersModal = (team) => {
    setCurrentTeam(team);
    setSelectedEmployeeId('');
    setIsMembersModalOpen(true);
  };
  const closeMembersModal = () => setIsMembersModalOpen(false);

  const handleTeamFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTeamFormData({ ...teamFormData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleTeamFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentTeam && currentTeam.id) {
        await updateTeam(currentTeam.id, teamFormData);
        toast.success('Team updated successfully!');
      } else {
        await createTeam(teamFormData);
        toast.success('Team created successfully!');
      }
      fetchAllData();
      closeTeamModal();
    } catch (error) {
      toast.error(error.response?.data?.name?.[0] || error.response?.data?.detail || `Failed to ${currentTeam ? 'update' : 'create'} team.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      setLoading(true);
      try {
        await deleteTeam(teamId);
        toast.success('Team deleted successfully!');
        fetchAllData();
      } catch (error) {
        toast.error('Failed to delete team.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSetManager = async () => {
    if (!currentTeam || !selectedEmployeeId) {
      toast.warn('Please select a team and an employee for manager.');
      return;
    }
    setLoading(true);
    try {
      await setTeamManager(currentTeam.id, selectedEmployeeId);
      toast.success('Team manager updated successfully!');
      fetchAllData();
      closeManagerModal();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to set team manager.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!currentTeam || !selectedEmployeeId) {
      toast.warn('Please select a team and an employee to add.');
      return;
    }
    setLoading(true);
    try {
      await addTeamMember(currentTeam.id, selectedEmployeeId);
      toast.success('Member added to team successfully!');
      fetchAllData();
      // Optionally keep modal open for more additions or close:
      // closeMembersModal(); 
      setSelectedEmployeeId(''); // Reset for next addition
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to add member.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (teamId, memberId) => {
    if (window.confirm('Are you sure you want to remove this member from the team?')) {
      setLoading(true);
      try {
        await removeTeamMember(teamId, memberId);
        toast.success('Member removed from team successfully!');
        fetchAllData();
      } catch (error) {
        toast.error(error.response?.data?.detail || 'Failed to remove member.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  const columns = useMemo(() => [
    { header: 'ID', accessorKey: 'id', size: 50 },
    { header: 'Team Name', accessorKey: 'name', size: 200 },
    { header: 'Status', accessorKey: 'active', cell: info => info.getValue() ? <CheckCircle color="green" /> : <XCircle color="red" />, size: 80 },
    {
      header: 'Manager',
      accessorKey: 'manager',
      cell: ({ row }) => (
        <div>
          {row.original.manager ? (row.original.manager.full_name || row.original.manager.employee_id) : 'Not Assigned'}
          <UserCog size={18} style={{ marginLeft: '8px', cursor: 'pointer', color: '#007bff' }} onClick={() => openManagerModal(row.original)} />
        </div>
      ),
      size: 250,
    },
    {
      header: 'Members',
      accessorKey: 'members',
      cell: ({ row }) => (
        <div>
          {row.original.members?.length || 0} member(s)
          <Users size={18} style={{ marginLeft: '8px', cursor: 'pointer', color: '#28a745' }} onClick={() => openMembersModal(row.original)} />
        </div>
      ),
      size: 150,
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button className='tm_action-button' onClick={() => openTeamModal(row.original)} title="Edit Team"><Edit size={18} color="#ffc107" /></button>
          <button className='tm_action-button' onClick={() => handleDeleteTeam(row.original.id)} title="Delete Team"><Trash2 size={18} color="#dc3545" /></button>
        </div>
      ),
      size: 100,
    },
  ], [allEmployees]);

  const table = useReactTable({
    data: teams,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="tm_content-wrapper page-layout-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='tm_header'>
        <h2 className='rsh'>Team Management</h2>
        <button className='tm_button tm_create-button' onClick={() => openTeamModal()}>
          <PlusCircle size={18} /> Create Team
        </button>
      </div>

      {loading && <p>Loading teams...</p>}
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
              <button className='tm_button' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>«</button>
              <button className='tm_button' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>‹</button>
              <span> Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} </span>
              <button className='tm_button' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>›</button>
              <button className='tm_button' onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>»</button>
            </div>
          )}
        </>
      )}

      {/* Create/Edit Team Modal */}
      <Modal isOpen={isTeamModalOpen} onRequestClose={closeTeamModal} className='tm_modal-content' overlayClassName='tm_modal-overlay' contentLabel="Team Form">
        <h3 style={{textAlign: 'center', marginBottom: '1.5rem'}}>{currentTeam ? 'Edit Team' : 'Create New Team'}</h3>
        <form onSubmit={handleTeamFormSubmit}>
          <div>
            <label className='tm_form-label' htmlFor="name">Team Name:</label>
            <input className='tm_form-input' type="text" id="name" name="name" value={teamFormData.name} onChange={handleTeamFormChange} required />
          </div>
          <div className='tm_form-checkbox-container'>
            <input type="checkbox" id="active" name="active" checked={teamFormData.active} onChange={handleTeamFormChange} />
            <label htmlFor="active" style={{fontWeight: 'normal', marginBottom: 0}}>Active</label>
          </div>
          <div className='tm_modal-actions'>
            <button type="button" className='tm_button' onClick={closeTeamModal}>Cancel</button>
            <button type="submit" className='tm_button tm_create-button' disabled={loading}>
              {loading ? 'Saving...' : (currentTeam ? 'Update Team' : 'Create Team')}
            </button>
          </div>
        </form>
      </Modal>

      {/* Set Manager Modal */}
      <Modal isOpen={isManagerModalOpen} onRequestClose={closeManagerModal} className='tm_modal-content' overlayClassName='tm_modal-overlay' contentLabel="Set Manager">
        <h3 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Set Manager for "{currentTeam?.name}"</h3>
        <p>Current Manager: {currentTeam?.manager ? (currentTeam.manager.full_name || currentTeam.manager.employee_id) : 'None'}</p>
        <div>
          <label className='tm_form-label' htmlFor="managerId">Select New Manager:</label>
          <select className='tm_form-input' id="managerId" value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(e.target.value)} required>
            <option value="">-- Select Employee --</option>
            {allEmployees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.full_name || emp.employee_id} ({emp.employee_id})</option>
            ))}
          </select>
        </div>
        <div className='tm_modal-actions'>
          <button type="button" className='tm_button' onClick={closeManagerModal}>Cancel</button>
          <button onClick={handleSetManager} className='tm_button tm_create-button' disabled={loading || !selectedEmployeeId}>
            {loading ? 'Saving...' : 'Set Manager'}
          </button>
        </div>
      </Modal>

      {/* Manage Members Modal */}
      <Modal isOpen={isMembersModalOpen} onRequestClose={closeMembersModal} className='tm_modal-content' overlayClassName='tm_modal-overlay' contentLabel="Manage Members">
        <h3 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Manage Members for "{currentTeam?.name}"</h3>
        <h4>Current Members:</h4>
        <ul className='tm_employee-list'>
            {currentTeam?.members?.map(member => (
                <li key={member.id} className='tm_employee-list-item'>
                    <span>{member.full_name || member.employee_id}</span>
                    <button className='tm_action-button' onClick={() => handleRemoveMember(currentTeam.id, member.id)} title="Remove Member">
                        <XCircle size={16} color="#dc3545"/>
                    </button>
                </li>
            ))}
            {currentTeam?.members?.length === 0 && <li style={{padding: '0.4rem 0.6rem', color: '#777'}}>No members in this team.</li>}
        </ul>
        <div style={{marginTop: '1rem'}}>
            <label className='tm_form-label' htmlFor="memberId">Add New Member:</label>
            <select className='tm_form-input' id="memberId" value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(e.target.value)}>
                <option value="">-- Select Employee --</option>
                {allEmployees
                    .filter(emp => !currentTeam?.members?.find(m => m.id === emp.id)) // Filter out existing members
                    .map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.full_name || emp.employee_id} ({emp.employee_id})</option>
                ))}
            </select>
        </div>
        <div className='tm_modal-actions'>
          <button type="button" className='tm_button' onClick={closeMembersModal}>Done</button>
          <button onClick={handleAddMember} className='tm_button tm_create-button' disabled={loading || !selectedEmployeeId}>
            {loading ? 'Adding...' : 'Add Member'}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default TeamManagement;