import React from "react";
import { useMediaQuery } from "react-responsive";
import MobileComponent from "../components/VolunteerDetails/VolunteerDetailsMobile"; // Import the mobile component
import WebComponent from "../components/VolunteerDetails/WebComponent"; // Import the web component

const OrgDetails = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return <div>{isMobile ? <MobileComponent /> : <WebComponent />}</div>;
};

export default OrgDetails;
