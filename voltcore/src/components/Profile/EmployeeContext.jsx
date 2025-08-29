import React, { createContext, useContext, useState } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  return (
    <EmployeeContext.Provider value={{ profile, setProfile }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);
