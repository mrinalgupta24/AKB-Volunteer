import React from "react";
import { useMediaQuery } from "react-responsive";
import MobileComponent from "../components/VolunteerCategory/VCMobileComponent"; // Import the mobile component
import WebComponent from "../components/VolunteerCategory/VCWebComponent"; // Import the web component

const VolunteerCategory = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return <div>{isMobile ? <MobileComponent /> : <WebComponent />}</div>;
};

export default VolunteerCategory;
