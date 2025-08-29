import React, { useState } from 'react';
import './Inbox.css';

function InboxMessage() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ to, subject, message });
    setTo('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="inbox-full-container">
      <div className="inbox-form-wrapper">
        <h2>Send Message</h2>
        <form onSubmit={handleSubmit} className="inbox-form">
          <label>To</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Recipient"
            required
          />

          <label>Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
          />

          <label>Message</label>
          <textarea
            rows="10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            required
          ></textarea>

          <button type="submit" className="inbox-submit-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default InboxMessage;
