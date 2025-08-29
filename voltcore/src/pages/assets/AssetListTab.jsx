import React, { useState, useEffect } from "react";
import "./AssetListTab.css";

const statusClass = (status) => {
  switch (status) {
    case "Available":
      return "status available";
    case "Assigned":
    case "Unavailable":
      return "status assigned";
    case "In Repair":
      return "status repair";
    case "Retired":
      return "status retired";
    case "Lost":
      return "status lost";
    default:
      return "status";
  }
};

const AssetListTab = ({ assetList = [], selectedCategory = "All" }) => {
  const [assets, setAssets] = useState(assetList);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    setAssets(assetList); // Update when parent list changes
    setCurrentPage(1); // Reset page on update
  }, [assetList]);

  const filteredAssets = assets.filter((a) => {
    const matchesCategory =
      selectedCategory === "All" || a.assetName === selectedCategory;
    const matchesStatus =
      statusFilter === "All" || a.status === statusFilter;
    const matchesSearch =
      a.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.assetId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredAssets.length / rowsPerPage);
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleEdit = (id) => alert(`Edit Asset ID: ${id}`);
  const handleDelete = (id) => {
    if (window.confirm(`Delete Asset ID: ${id}?`)) {
      setAssets((prev) => prev.filter((a) => a.assetId !== id));
      setSelectedAssets((prev) => prev.filter((a) => a !== id));
    }
  };

  const handleSelect = (id) => {
    setSelectedAssets((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAssets(paginatedAssets.map((a) => a.assetId));
    } else {
      setSelectedAssets([]);
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm("Delete selected assets?")) {
      setAssets((prev) =>
        prev.filter((a) => !selectedAssets.includes(a.assetId))
      );
      setSelectedAssets([]);
    }
  };

  const handleBulkAssign = () => {
    const name = prompt("Assign selected assets to:");
    if (name) {
      setAssets((prev) =>
        prev.map((a) =>
          selectedAssets.includes(a.assetId)
            ? {
                ...a,
                status: "Assigned",
                assignedTo: name,
                assignedDate: new Date().toISOString().split("T")[0],
              }
            : a
        )
      );
      setSelectedAssets([]);
    }
  };

  const handleBulkChangeStatus = (newStatus) => {
    setAssets((prev) =>
      prev.map((a) =>
        selectedAssets.includes(a.assetId)
          ? { ...a, status: newStatus }
          : a
      )
    );
    setSelectedAssets([]);
  };

  return (
    <div className="asset-list-tab">
      <div className="card">
        <div className="table-header">
          <h3>IT Assets List {selectedCategory !== "All" && ` - ${selectedCategory}`}</h3>
          <div className="top-controls">
            <input
              type="text"
              placeholder="🔍 Search by name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
              <option value="In Repair">In Repair</option>
              <option value="Retired">Retired</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
        </div>

        {selectedAssets.length > 0 && (
          <div className="bulk-actions">
            <button onClick={handleBulkDelete}>🗑️ Delete</button>
            <button onClick={handleBulkAssign}>📤 Assign</button>
            <button onClick={() => handleBulkChangeStatus("Available")}>
              ✅ Available
            </button>
            <button onClick={() => handleBulkChangeStatus("In Repair")}>
              🛠️ In Repair
            </button>
          </div>
        )}

        <table className="table-style1">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    paginatedAssets.length > 0 &&
                    selectedAssets.length === paginatedAssets.length
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th>Asset Name</th>
              <th>Asset ID</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Assigned Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAssets.map((asset) => (
              <tr key={asset.assetId}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedAssets.includes(asset.assetId)}
                    onChange={() => handleSelect(asset.assetId)}
                  />
                </td>
                <td>{asset.assetName}</td>
                <td>{asset.assetId}</td>
                <td>
                  <span className={statusClass(asset.status)}>
                    {asset.status}
                  </span>
                </td>
                <td>{asset.assignedTo}</td>
                <td>{asset.assignedDate}</td>
                <td>
                  <button
                    title="Edit"
                    onClick={() => handleEdit(asset.assetId)}
                  >
                    ✏️
                  </button>
                  <button
                    title="Delete"
                    onClick={() => handleDelete(asset.assetId)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              ◀ Prev
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetListTab;
