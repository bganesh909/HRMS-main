import React, { useState, useEffect } from "react";
import itAssetList from "./AssetData"; 
import AssetListTab from "./AssetListTab"; 
import "./AssetCategorySection.css";

const groupAssets = (list) => {
  const grouped = {};
  list.forEach((asset) => {
    const { assetName, status } = asset;
    if (!grouped[assetName]) {
      grouped[assetName] = {
        assetType: assetName,
        description: "N/A",
        total: 0,
        available: 0,
        status: "Active",
      };
    }
    grouped[assetName].total += 1;
    if (status === "Available") {
      grouped[assetName].available += 1;
    }
  });
  return Object.values(grouped);
};

const AssetCategorySection = () => {
  const [categories, setCategories] = useState(["IT Assets", "Stationary"]);
  const [newCategory, setNewCategory] = useState("");
  const [assets, setAssets] = useState({});
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showAssetFormFor, setShowAssetFormFor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("IT Assets");
  const [searchTerm, setSearchTerm] = useState("");
  const [assetSearchTerm, setAssetSearchTerm] = useState("");
  const [expandedAssetType, setExpandedAssetType] = useState(null);
  const [editingAssetIndex, setEditingAssetIndex] = useState(null);
  const [itAssets, setItAssets] = useState([]); // store original asset list

  useEffect(() => {
    const grouped = groupAssets(itAssetList);
    setItAssets(itAssetList); // set full IT asset list
    setAssets({
      "IT Assets": grouped,
      "Stationary": [
        { assetType: "Notebook", description: "A5 size", total: 100, available: 70, status: "Active" },
        { assetType: "Pen", description: "Blue ink", total: 200, available: 150, status: "Active" },
        { assetType: "Marker", description: "Permanent", total: 50, available: 20, status: "Active" },
        { assetType: "Chair", description: "Small size", total: 10, available: 7, status: "Active" },
        { assetType: "Waterbottle", description: "Small size", total: 10, available: 7, status: "Active" },
      ],
    });
  }, []);

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setAssets({ ...assets, [newCategory]: [] });
      setNewCategory("");
      setShowCategoryForm(false);
    }
  };

  const handleAddAsset = (category, asset) => {
    const updatedAssets = [...(assets[category] || []), asset];
    setAssets({ ...assets, [category]: updatedAssets });
    setShowAssetFormFor(null);
  };

  const handleUpdateAsset = (index, updatedAsset) => {
    const updatedList = [...assets[selectedCategory]];
    updatedList[index] = updatedAsset;
    setAssets({ ...assets, [selectedCategory]: updatedList });
    setEditingAssetIndex(null);
  };

  const handleDeleteAsset = (index) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      const updatedList = assets[selectedCategory].filter((_, i) => i !== index);
      setAssets({ ...assets, [selectedCategory]: updatedList });
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAssets = assets[selectedCategory]?.filter((asset) =>
    asset.assetType.toLowerCase().includes(assetSearchTerm.toLowerCase())
  );

  return (
    <div className="category-type-layout">
      <div className="category-sidebar">
        <input
          className="search-input"
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn-add" onClick={() => setShowCategoryForm(!showCategoryForm)}>
          {showCategoryForm ? "Cancel" : "Add Category"}
        </button>
        {showCategoryForm && (
          <div className="form-row">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
            />
            <button className="btn-add" onClick={handleAddCategory}>Add</button>
          </div>
        )}
        <div className="category-list">
          {filteredCategories.map((cat, idx) => (
            <div
              key={idx}
              className={`category-item ${selectedCategory === cat ? "selected" : ""}`}
              onClick={() => {
                setSelectedCategory(cat);
                setAssetSearchTerm("");
              }}
            >
              {cat} ({assets[cat]?.length || 0})
            </div>
          ))}
        </div>
      </div>

      <div className="category-details-panel">
        <div className="panel-header">
          <h3>{selectedCategory || "Select a Category"}</h3>
          {selectedCategory && (
            <button className="btn-add" onClick={() => {
              setShowAssetFormFor(selectedCategory);
              setEditingAssetIndex(null);
            }}>
              Add Asset Type
            </button>
          )}
        </div>

        {showAssetFormFor === selectedCategory && editingAssetIndex === null && (
          <AssetForm onSubmit={(asset) => handleAddAsset(selectedCategory, asset)} />
        )}

        {editingAssetIndex !== null && (
          <AssetForm
            asset={assets[selectedCategory][editingAssetIndex]}
            onSubmit={(updatedAsset) => handleUpdateAsset(editingAssetIndex, updatedAsset)}
            onCancel={() => setEditingAssetIndex(null)}
          />
        )}

        {selectedCategory && (
          <div className="asset-card-container">
            <div className="asset-card-header">
              <h4>{selectedCategory} Assets</h4>
            </div>

            <input
              className="search-input"
              type="text"
              placeholder="Search assets..."
              value={assetSearchTerm}
              onChange={(e) => setAssetSearchTerm(e.target.value)}
              style={{ marginBottom: "10px", width: "100%" }}
            />

            <table className="table-style1">
              <thead>
                <tr>
                  <th>Asset Type</th>
                  <th>Description</th>
                  <th>Total Count</th>
                  <th>Available Count</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets?.length ? (
                  filteredAssets.map((asset, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{asset.assetType}</td>
                        <td>{asset.description || "N/A"}</td>
                        <td>{asset.total}</td>
                        <td>
                          {asset.available}
                          {parseInt(asset.available) < 3 && (
                            <span className="warning-icon">⚠️</span>
                          )}
                        </td>
                        <td>
                          <span className={`status-tag ${asset.status.toLowerCase()}`}>
                            {asset.status}
                          </span>
                        </td>
                        <td style={{ display: "flex", gap: "4px" }}>
                          <button className="icon-button" onClick={() => {
                            setEditingAssetIndex(index);
                            setShowAssetFormFor(null);
                          }}>✏️</button>
                          <button className="icon-button" onClick={() => handleDeleteAsset(index)}>🗑️</button>
                          {selectedCategory === "IT Assets" && (
                            <button
                              className="icon-button"
                              onClick={() =>
                                setExpandedAssetType(
                                  expandedAssetType === asset.assetType ? null : asset.assetType
                                )
                              }
                            >
                              {expandedAssetType === asset.assetType ? "🔽" : "▶️"}
                            </button>
                          )}
                        </td>
                      </tr>

                      {expandedAssetType === asset.assetType && selectedCategory === "IT Assets" && (
                        <tr>
                          <td colSpan="6">
                            <AssetListTab
                              assetList={itAssets.filter((item) => item.assetName === asset.assetType)}
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No assets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const AssetForm = ({ asset = {}, onSubmit, onCancel }) => {
  const [assetType, setAssetType] = useState(asset.assetType || "");
  const [description, setDescription] = useState(asset.description || "");
  const [total, setTotal] = useState(asset.total || "");
  const [available, setAvailable] = useState(asset.available || "");
  const [status, setStatus] = useState(asset.status || "Active");

  const handleSubmit = () => {
    if (assetType && total && available && status) {
      onSubmit({
        assetType,
        description: description || "N/A",
        total: parseInt(total),
        available: parseInt(available),
        status,
      });
      setAssetType("");
      setDescription("");
      setTotal("");
      setAvailable("");
      setStatus("Active");
    }
  };

  return (
    <div className="form-row asset-form">
      <input placeholder="Asset Type" value={assetType} onChange={(e) => setAssetType(e.target.value)} />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input placeholder="Total Count" value={total} onChange={(e) => setTotal(e.target.value)} />
      <input placeholder="Available Count" value={available} onChange={(e) => setAvailable(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Active</option>
        <option>Inactive</option>
      </select>
      <button className="btn-add" onClick={handleSubmit}>Save</button>
      {onCancel && <button className="btn-cancel" onClick={onCancel}>Cancel</button>}
    </div>
  );
};

export default AssetCategorySection;