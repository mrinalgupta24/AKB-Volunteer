import React from "react";
import { useMediaQuery } from "react-responsive";
import MobileComponent from "../components/VolunteerSelectCategory/MobileComponent"; // Import the mobile component
import WebComponent from "../components/VolunteerSelectCategory/WebComponent"; // Import the web component

const VolunteerSelectCategory = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return <div>{isMobile ? <MobileComponent /> : <WebComponent />}</div>;
};

export default VolunteerSelectCategory;
