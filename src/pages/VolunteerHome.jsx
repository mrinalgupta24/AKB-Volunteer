import React from "react";
import { useMediaQuery } from "react-responsive";
import MobileComponent from "../components/VolunteerHome/MobileComponent"; // Import the mobile component
import WebComponent from "../components/VolunteerHome/WebComponent"; // Import the web component

const VolunteerHome = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return <div>{isMobile ? <MobileComponent /> : <WebComponent />}</div>;
};

export default VolunteerHome;
