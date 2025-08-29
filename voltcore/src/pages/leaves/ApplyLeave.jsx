import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ApplyLeaveForm({ onSuccess, editingLeave }) {
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    contactDuringLeave: "",
    attachment: null,
  });

  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/csrf/", { withCredentials: true })
      .then((res) => setCsrfToken(res.data.csrftoken))
      .catch((err) => console.error("CSRF fetch error", err));
  }, []);

  useEffect(() => {
    if (editingLeave) {
      setFormData({
        leaveType: editingLeave.leaveType,
        fromDate: editingLeave.startDate,
        toDate: editingLeave.endDate,
        reason: editingLeave.reason || "",
        contactDuringLeave: editingLeave.contactDuringLeave || "",
        attachment: null,
      });
    }
  }, [editingLeave]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setFormData({ ...formData, attachment: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("leaveType", formData.leaveType);
    form.append("startDate", formData.fromDate);
    form.append("endDate", formData.toDate);
    form.append("reason", formData.reason);
    form.append("contactDuringLeave", formData.contactDuringLeave || "");
    if (formData.attachment) {
      form.append("attachment", formData.attachment);
    }
    form.append("status", "Pending");

    try {
      if (editingLeave) {
        await axios.patch(
          `http://localhost:8000/leave/${editingLeave.id}/`,
          form,
          {
            headers: {
              "X-CSRFToken": csrfToken,
            },
            withCredentials: true,
          }
        );
        toast.success("Leave updated.");
      } else {
        await axios.post("http://localhost:8000/leave/", form, {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        });
        toast.success("Leave applied.");
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Backend error:", err.response?.data || err);
      toast.error("Submission failed");
    }
  };

  return (
    <form className="leave-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-row">
        <div className="form-group">
          <label>Leave Type:</label>
          <select name="leaveType" value={formData.leaveType} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Sick">Sick</option>
            <option value="Casual">Casual</option>
          </select>
        </div>
        <div className="form-group">
          <label>From Date:</label>
          <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>To Date:</label>
          <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Reason:</label>
          <input type="text" name="reason" value={formData.reason} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contact (Optional):</label>
          <input type="text" name="contactDuringLeave" value={formData.contactDuringLeave} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Attachment (Optional):</label>
          <input type="file" name="attachment" onChange={handleChange} accept=".pdf,.png,.jpg,.jpeg" />
        </div>
      </div>

      <div className="form-buttons">
        <button type="submit">{editingLeave ? "Update" : "Apply"}</button>
      </div>
    </form>
  );
}

export default ApplyLeaveForm;
