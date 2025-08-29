import React from 'react';
import './Inbox.css';

const announcements = [
  {
    id: 1,
    title: 'Company Townhall',
    message: 'Join us for the quarterly townhall on Friday at 4 PM in the main auditorium.',
    date: 'April 23, 2025',
  },
  {
    id: 2,
    title: 'Team Building Event',
    message: 'A fun day of activities at the city park this Saturday!',
    date: 'April 20, 2025',
  },
  {
    id: 3,
    title: 'IT Maintenance',
    message: 'Servers will be down for scheduled maintenance from 11 PM to 2 AM tonight.',
    date: 'April 18, 2025',
  },
];

function InboxAnnouncementsForm() {
  return (
    <div className="inbox-full-container">
      <div className="inbox-form-wrapper">
        <h2>Announcements</h2>
        <ul className="announcement-list">
          {announcements.map((item) => (
            <li key={item.id} className="announcement-item">
              <strong>{item.title}</strong>
              <p>{item.message}</p>
              <span className="announcement-date">{item.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InboxAnnouncementsForm;
