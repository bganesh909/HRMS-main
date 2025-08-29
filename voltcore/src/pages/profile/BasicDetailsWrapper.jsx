import React, { useState } from "react";
import BasicDetails from "./BasicDetails";

const BasicDetailsWrapper = () => {
  const [profileData, setProfileData] = useState(null); // optional prefilled data

  const handleSaveSuccess = (updatedProfile) => {
    setProfileData(updatedProfile); // Update local state if needed
  };

  return <BasicDetails profileData={profileData} onSaveSuccess={handleSaveSuccess} />;
};

export default BasicDetailsWrapper;
