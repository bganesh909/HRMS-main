import React, { useState } from "react";
import ProfileNavbar from "./ProfileNavbar";
import { useEmployee } from './EmployeeContext';
import "./uploaddocuments.css";



const UploadDocument = () => {
  const { profile } = useEmployee();
  const [docType, setDocType] = useState("");
  const [file, setFile] = useState(null);

const handleUpload = async () => {
  if (!docType || !file) {
    alert("Please select both document type and file.");
    return;
  }
  if (!profile || !profile.employee_id) {
    alert("Profile not loaded yet. Please save profile first.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("doc_type", docType);
    formData.append("file", file);
formData.append("employee_id", profile.employee_id);

    const response = await fetch("http://127.0.0.1:8000/upload-documents/", {
      method: "POST",
      headers: {
        "Accept": "application/json"
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      alert("Document uploaded successfully.");
      setDocType("");
      setFile(null);
    } else {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        alert("Upload failed: " + JSON.stringify(errorData));
      } else {
        const text = await response.text();
        alert("Upload failed: " + text);
      }
    }
  } catch (error) {
    alert("Network error: " + error.message);
  }
};


  return (
    <div className="employee-profile">
      <ProfileNavbar />
      <h2>Upload Document for Employee ID: {profile ? profile.employee_id || 'N/A' : 'N/A'}</h2>

      <div>
        <label>Document Type</label>
        <select value={docType} onChange={(e) => setDocType(e.target.value)}>
          <option value="">Select Document Type</option>
          <option value="Aadhar Card">Aadhar Card</option>
          <option value="Driving Licence">Driving Licence</option>
          <option value="PAN Card">PAN Card</option>
          <option value="Passport">Passport</option>
          <option value="Education">Education</option>
          <option value="Experience">Experience</option>
        </select>
      </div>

      <div>
        <label>Choose File</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" // optional: limit acceptable file types
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={!docType || !file || !profile || !profile.id}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadDocument;
