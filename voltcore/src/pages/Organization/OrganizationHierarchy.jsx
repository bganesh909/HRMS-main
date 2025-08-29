import React from "react";
import "./OrganizationHierarchy.css";

const orgStructure = [
  {
    title: "Executive Leadership",
    members: [{ name: "CEO", person: "Bhavish Saravanan" }],
  },
  {
    title: "Human Resources Department",
    members: [{ name: "HR Manager", person: "Anita Rao" }],
  },
  {
    title: "Engineering Team",
    members: [
      { name: "Technical Lead", person: "Ravi Kumar" },
      { name: "Software Engineer", person: "Megha Sharma" },
      { name: "Intern", person: "Rahul Verma" },
    ],
  },
  {
    title: "Sales & Marketing",
    members: [
      { name: "Marketing Manager", person: "Kavya Iyer" },
      { name: "Sales Executive", person: "Tarun Joshi" },
    ],
  },
  {
    title: "Finance",
    members: [
      { name: "Finance Officer", person: "Sana Patel" },
      { name: "Accountant", person: "Neeraj Singh" },
    ],
  },
  {
    title: "Operations",
    members: [
      { name: "Operations Supervisor", person: "Deepak Rao" },
      { name: "Support Staff", person: "Priya Nair" },
    ],
  },
  {
    title: "Support Functions",
    members: [
      { name: "IT Support", person: "Suresh K" },
      { name: "Office Assistant", person: "Lakshmi R" },
    ],
  },
];

const OrganizationHierarchy = () => {
  return (
    <div className="org-container">
      {orgStructure.map((section, index) => (
        <div key={index} className="org-section">
          <h3>{section.title}</h3>
          <ul>
            {section.members.map((member, i) => (
              <li key={i}>
                <strong>{member.name}</strong>: {member.person}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrganizationHierarchy;
