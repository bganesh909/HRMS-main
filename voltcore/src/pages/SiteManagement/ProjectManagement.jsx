import React, { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { PlusCircle, Edit, Trash2, UserPlus, Users, XCircle, CheckCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  addProjectEmployee,
  removeProjectEmployee,
  getAllEmployeesSimple,
} from '../../api/services';

import "./ProjectManagement.css"

Modal.setAppElement('#root');

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [assignmentType, setAssignmentType] = useState('member'); // 'member' or 'manager'
  const [projectFormData, setProjectFormData] = useState({ name: '', description: '' });

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [projectsData, employeesData] = await Promise.all([
        getAllProjects(),
        getAllEmployeesSimple(),
      ]);
      setProjects(projectsData || []);
      setAllEmployees(employeesData || []);
    } catch (error) {
      toast.error('Failed to fetch initial data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const openProjectModal = (project = null) => {
    setCurrentProject(project);
    setProjectFormData(project ? { name: project.name, description: project.description || '' } : { name: '', description: '' });
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    setCurrentProject(null);
    setProjectFormData({ name: '', description: '' });
  };

  const openAssignModal = (project, type) => {
    setCurrentProject(project);
    setAssignmentType(type);
    setSelectedEmployeeId('');
    setIsAssignModalOpen(true);
  };

  const closeAssignModal = () => {
    setIsAssignModalOpen(false);
    setCurrentProject(null);
    setSelectedEmployeeId('');
  };

  const handleProjectFormChange = (e) => {
    setProjectFormData({ ...projectFormData, [e.target.name]: e.target.value });
  };

  const handleProjectFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentProject && currentProject.id) {
        await updateProject(currentProject.id, projectFormData);
        toast.success('Project updated successfully!');
      } else {
        await createProject(projectFormData);
        toast.success('Project created successfully!');
      }
      fetchAllData(); // Re-fetch all to get latest
      closeProjectModal();
    } catch (error) {
      const action = currentProject ? 'update' : 'create';
      toast.error(error.response?.data?.name?.[0] || error.response?.data?.detail || `Failed to ${action} project.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      setLoading(true);
      try {
        await deleteProject(projectId);
        toast.success('Project deleted successfully!');
        fetchAllData();
      } catch (error) {
        toast.error('Failed to delete project.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAssignEmployee = async () => {
    if (!currentProject || !selectedEmployeeId) {
      toast.warn('Please select a project and an employee.');
      return;
    }
    setLoading(true);
    try {
      await addProjectEmployee(currentProject.id, selectedEmployeeId, assignmentType);
      toast.success(`Employee successfully added as ${assignmentType}.`);
      fetchAllData();
      closeAssignModal();
    } catch (error) {
      toast.error(error.response?.data?.detail || `Failed to add employee as ${assignmentType}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProjectEmployee = async (projectId, employeeId, type) => {
    if (window.confirm(`Are you sure you want to remove this ${type} from the project?`)) {
      setLoading(true);
      try {
        await removeProjectEmployee(projectId, employeeId, type);
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} removed successfully.`);
        fetchAllData();
      } catch (error) {
        toast.error(error.response?.data?.detail || `Failed to remove ${type}.`);
      } finally {
        setLoading(false);
      }
    }
  };

  const columns = useMemo(() => [
    { header: 'ID', accessorKey: 'id', size: 50 },
    { header: 'Name', accessorKey: 'name', size: 200 },
    { header: 'Description', accessorKey: 'description', size: 300, cell: info => <span title={info.getValue()}>{info.getValue()?.substring(0, 50) + (info.getValue()?.length > 50 ? '...' : '')}</span> },
    {
      header: 'Managers',
      accessorKey: 'managers',
      cell: ({ row }) => (
        <div>
          {(row.original.managers?.length > 0 ? row.original.managers.map(m => m.full_name || m.employee_id).join(', ') : 'None')}
          <UserPlus size={18} style={{ marginLeft: '8px', cursor: 'pointer', color: '#007bff' }} onClick={() => openAssignModal(row.original, 'manager')} />
        </div>
      ),
      size: 250,
    },
    {
      header: 'Members',
      accessorKey: 'members',
      cell: ({ row }) => (
        <div>
          {(row.original.members?.length > 0 ? row.original.members.map(m => m.full_name || m.employee_id).join(', ') : 'None')}
          <Users size={18} style={{ marginLeft: '8px', cursor: 'pointer', color: '#28a745' }} onClick={() => openAssignModal(row.original, 'member')} />
        </div>
      ),
      size: 250,
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button className='pm_action-button' onClick={() => openProjectModal(row.original)} title="Edit Project"><Edit size={18} color="#ffc107" /></button>
          <button className='pm_action-button' onClick={() => handleDeleteProject(row.original.id)} title="Delete Project"><Trash2 size={18} color="#dc3545" /></button>
        </div>
      ),
      size: 100,
    },
  ], [allEmployees]); // Re-memoize if allEmployees changes, though not directly used in columns

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const currentProjectParticipants = useMemo(() => {
    if (!currentProject) return { managers: [], members: [] };
    const projectInState = projects.find(p => p.id === currentProject.id);
    return {
        managers: projectInState?.managers || [],
        members: projectInState?.members || [],
    };
  }, [currentProject, projects]);


  return (
    <div className="pm_content-wrapper page-layout-container osns">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="pm_header">
        <h2 className='rsh'>Project Management</h2>
        <button className='pm_button pm_create-button' onClick={() => openProjectModal()}>
          <PlusCircle size={18} /> Create Project
        </button>
      </div>

      {loading && <p>Loading projects...</p>}
      
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
              <button className='pm_button' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>«</button>
              <button className='pm_button' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>‹</button>
              <span> Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} </span>
              <button className='pm_button' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>›</button>
              <button className='pm_button' onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>»</button>
            </div>
          )}
        </>
      )}

      <Modal isOpen={isProjectModalOpen} onRequestClose={closeProjectModal} className="pm_modal-content" overlayClassName="pm_modal-overlay" contentLabel="Project Form">
        <h3 style={{textAlign: 'center', marginBottom: '1.5rem'}}>{currentProject ? 'Edit Project' : 'Create New Project'}</h3>
        <form onSubmit={handleProjectFormSubmit}>
          <div>
            <label className='pm_form-label' htmlFor="name">Project Name:</label>
            <input className='pm_form-input' type="text" id="name" name="name" value={projectFormData.name} onChange={handleProjectFormChange} required />
          </div>
          <div>
            <label className='pm_form-label' htmlFor="description">Description:</label>
            <textarea className='pm_form-textarea' id="description" name="description" value={projectFormData.description} onChange={handleProjectFormChange} />
          </div>
          <div className='pm_modal-actions'>
            <button type="button" onClick={closeProjectModal}>Cancel</button>
            <button className='pm_button pm_create-button' type="submit" disabled={loading}>
              {loading ? 'Saving...' : (currentProject ? 'Update Project' : 'Create Project')}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isAssignModalOpen} onRequestClose={closeAssignModal} className="pm_modal-content" overlayClassName="pm_modal-overlay" contentLabel="Assign Employee">
        <h3 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Assign {assignmentType} to "{currentProject?.name}"</h3>
        
        <h4>Current {assignmentType === 'manager' ? 'Managers' : 'Members'}:</h4>
        <ul className='pm_employee-list'>
            {(assignmentType === 'manager' ? currentProjectParticipants.managers : currentProjectParticipants.members).map(emp => (
                <li key={emp.id} className='pm_employee-list-item'>
                    <span>{emp.full_name || emp.employee_id}</span>
                    <button 
                        // style={{...styles.actionButton, padding: '0.1rem 0.3rem'}} 
                        onClick={() => handleRemoveProjectEmployee(currentProject.id, emp.id, assignmentType)}
                        title={`Remove ${assignmentType}`}
                    >
                        <XCircle size={16} color="#dc3545"/>
                    </button>
                </li>
            ))}
            {(assignmentType === 'manager' ? currentProjectParticipants.managers.length === 0 : currentProjectParticipants.members.length === 0) && (
                <li style={{padding: '0.4rem 0.6rem', color: '#777'}}>No {assignmentType}s assigned yet.</li>
            )}
        </ul>

        <div style={{marginTop: '1rem'}}>
          <label className='pm_form-label' htmlFor="employeeId">Select Employee to Add:</label>
          <select className='pm_form-input' id="employeeId" value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(e.target.value)} required>
            <option value="">-- Select Employee --</option>
            {allEmployees
                .filter(emp => !(assignmentType === 'manager' ? currentProjectParticipants.managers : currentProjectParticipants.members).find(pEmp => pEmp.id === emp.id)) // Filter out already assigned
                .map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.full_name || emp.employee_id} ({emp.employee_id})</option>
            ))}
          </select>
        </div>
        <div className='pm_modal-actions'>
          <button type="button" onClick={closeAssignModal}>Cancel</button>
          <button onClick={handleAssignEmployee} disabled={loading || !selectedEmployeeId}>
            {loading ? 'Assigning...' : `Add as ${assignmentType}`}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ProjectManagement;