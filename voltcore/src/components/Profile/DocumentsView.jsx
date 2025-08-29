import React, { useEffect, useState } from "react";
import { useEmployee } from "./EmployeeContext";
import ProfileNavbar from "./ProfileNavbar";
import "./documentsview.css";

const DocumentsView = () => {
  const { profile } = useEmployee();
  const employeeId = profile?.employee_id;
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (employeeId) {
      fetchDocuments();
    }
  }, [employeeId]);
  const fetchDocuments = async () => {
    const res = await fetch(`http://127.0.0.1:8000/upload-documents/?employee_id=${employeeId}`);
    const data = await res.json();
    setDocuments(data);
  };
  
  if (!profile) {
    return (
      <div className="employee-profile">
        <ProfileNavbar />
        <p>Please select or load an employee profile first.</p>
      </div>
    );
  }

  return (
    <div className="employee-profile">
      <ProfileNavbar />
      <h2>Documents for Employee ID: {profile.employee_id}</h2>
      <p>Total Documents: {documents.length}</p>

      {documents.length === 0 ? (
        <p>No documents uploaded.</p>
      ) : (
        <div className="documents-container">
          {documents.map((doc) => (
  <div key={doc.id} className="document-card">
    <h3>{doc.document_type}</h3>
    {doc.document ? (
  <a
    href={`http://127.0.0.1:8000${doc.document}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    View
  </a>
) : (
  <span>No file uploaded</span>
)}

     
  </div>
))}
        </div>
      )}
    </div>
  );
};

export default DocumentsView;
