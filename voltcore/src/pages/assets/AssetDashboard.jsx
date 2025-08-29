import React, { useState } from "react";
import "./AssetDashboard.css";
import AssetCategorySection from "./AssetCategorySection";
import AssetPR from "./AssetPR";
import assetData from "./AssetData";
import {
  FaCheckCircle,
  FaHourglass,
  FaTools,
  FaExclamationCircle,
  FaBox,
  FaQuestionCircle,
} from "react-icons/fa";

const tabs = [
  "Dashboard",
  "Asset category",
  "Asset PR",
];

const AssetDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Calculate status counts
  const statusCounts = {
    "Available": 0,
    "Assigned": 0,
    "In Repair": 0,
    "Retired": 0,
    "Archived": 0,
    "Lost": 0,
  };

  assetData.forEach((asset) => {
    if (statusCounts.hasOwnProperty(asset.status)) {
      statusCounts[asset.status]++;
    }
  });

  const [showStatus, setShowStatus] = useState(true);

  const pendingRequests = 0;
  const licenseDue = 0;
  const licenseUpcoming = 0;
  const warrantyDue = 0;
  const warrantyUpcoming = 10;

  return (
    <div className="asset-container">
      {/* Top Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === "Dashboard" && (
        <>
          <h2>Assets</h2>
          <div className="top-summary">
            <div className="card blue">
              <h3>{statusCounts["Available"]}</h3>
              <p>Available Assets</p>
            </div>
            <div className="card green">
              <h3>{pendingRequests}</h3>
              <p>Pending Requests</p>
            </div>
            <div className="card gray">
              <div className="row">
                <div><h4>{licenseDue}</h4><p>Due</p></div>
                <div><h4>{licenseUpcoming}</h4><p>Upcoming</p></div>
              </div>
              <p>License Renewal</p>
            </div>
            <div className="card red">
              <div className="row">
                <div><h4>{warrantyDue}</h4><p>Due</p></div>
                <div><h4>{warrantyUpcoming}</h4><p>Upcoming</p></div>
              </div>
              <p>Warranty Renewal</p>
            </div>
          </div>

          {/* Toggle Asset Status */}
          <div className="status-section">
            <div className="status-header" onClick={() => setShowStatus(!showStatus)}>
              <h3>Assets Status</h3>
              
            </div>
            {showStatus && (
              <div className="status-summary">
                <StatusCard icon={<FaCheckCircle />} color="available" count={statusCounts["Available"]} label="Available" />
                <StatusCard icon={<FaHourglass />} color="assigned" count={statusCounts["Assigned"]} label="Assigned" />
                <StatusCard icon={<FaTools />} color="repair" count={statusCounts["In Repair"]} label="In Repair" />
                <StatusCard icon={<FaExclamationCircle />} color="broken" count={statusCounts["Retired"]} label="Retired" />
                <StatusCard icon={<FaBox />} color="archived" count={statusCounts["Archived"]} label="Archived" />
                <StatusCard icon={<FaQuestionCircle />} color="lost" count={statusCounts["Lost"]} label="Lost" />
              </div>
            )}
          </div>
        </>
      )}
      {activeTab === "Asset category" && <AssetCategorySection />}
      {activeTab === "Asset PR" && <AssetPR/>}



      {/* You can add content for other tabs like 'Assets List', 'Assets Log', etc., here if needed */}
    
    </div>
  );
};

const StatusCard = ({ icon, color, count, label }) => (
  <div className="status-card">
    <div className={`status-icon ${color}`}>{icon}</div>
    <h4>{count}</h4> 
    <p>{label}</p>
  </div>
);

export default AssetDashboard;