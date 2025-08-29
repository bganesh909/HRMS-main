import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { fetchAllProjects } from '../../../api/services';
import ActionMenu from '../../../components/MoreActionsButton/MoreActionsButton';
import { useNavigate } from 'react-router-dom';
function ProjectManagement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const actionTypes = [
    {
      name: 'Manage',
      action: (id) => {
        console.log(`Time Sheet id to be submitted-->`, id.original);
        navigate(`/manage-project/${id.original.id}`);
      },
    },
  ];
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Project',
      accessorKey: 'project_name',
    },
    {
      header: 'Teams',
      accessorKey: 'teams',
      cell: (info) => {
        const status = info.getValue();
        return <span>{status.length}</span>;
      },
    },
    {
      header: 'Status',
      accessorKey: 'is_active',
      cell: (info) => {
        const status = info.getValue();
        return (
          <span className={`${status ? 'sts-a' : 'sts-r'}`}>{status ? 'Active' : 'In Active'}</span>
        );
      },
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => {
        //   const rowData = row.original;
        return (
          <div className="flex space-x-2 justify-center">
            <ActionMenu actionTypes={actionTypes} onEdit={() => ''} rowData={row} />
          </div>
        );
      },
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const projectData = async () => {
    const data = await fetchAllProjects();
    setData(data);
  };
  useEffect(() => {
    projectData();
  }, []);
  return (
    <div className="project-management">
      ProjectManagement
      <section className="">
        <div>Total Projects</div>
      </section>
      <div className="">
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
      </div>
    </div>
  );
}

export default ProjectManagement;
