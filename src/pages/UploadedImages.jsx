import React from "react";
import { useMediaQuery } from "react-responsive";
import MobileComponent from "../components/UploadedImages/MobileComponent"; // Import the mobile component
import WebComponent from "../components/UploadedImages/WebComponent"; // Import the web component

const UploadImages = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return <div>{isMobile ? <MobileComponent /> : <WebComponent />}</div>;
};

export default UploadImages;
