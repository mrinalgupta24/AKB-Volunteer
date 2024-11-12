import React from "react";
import { useMediaQuery } from "react-responsive";
import MobileComponent from "../components/VolunteerCategory/MobileComponent"; // Import the mobile component
import WebComponent from "../components/VolunteerCategory/WebComponent"; // Import the web component

const VolunteerCategory = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return <div>{isMobile ? <MobileComponent /> : <WebComponent />}</div>;
};

export default VolunteerCategory;
