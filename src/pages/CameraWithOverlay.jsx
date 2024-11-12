import React from "react";
import { useMediaQuery } from "react-responsive";
import MobileComponent from "../components/CameraWithOverlay/MobileComponent"; // Import the mobile component
import WebComponent from "../components/CameraWithOverlay/WebComponent"; // Import the web component

const CameraWithOverlay = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return <div>{isMobile ? <MobileComponent /> : <WebComponent />}</div>;
};

export default CameraWithOverlay;
