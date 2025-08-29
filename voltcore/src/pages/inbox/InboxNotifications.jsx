import React from 'react';
import './Inbox.css';

const notifications = [
  {
    id: 1,
    title: 'New Policy Update',
    description: 'HR policy updated for 2025',
    time: '10 mins ago',
  },
  {
    id: 2,
    title: 'Meeting Reminder',
    description: 'Performance review at 3PM',
    time: '1 hour ago',
  },
  {
    id: 3,
    title: 'Holiday Announcement',
    description: 'Office closed on May 1st',
    time: 'Yesterday',
  },
];

function InboxNotificationsForm() {
  return (
    <div className="inbox-full-container">
      <div className="inbox-form-wrapper">
        <h2>Notifications</h2>
        <ul className="notification-list">
          {notifications.map((note) => (
            <li key={note.id} className="notification-item">
              <strong>{note.title}</strong>
              <p>{note.description}</p>
              <span className="notification-time">{note.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InboxNotificationsForm;
