import React from 'react';
import './Card.css'; // We'll define styles next

const Card = ({ children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

export default Card;