import React from "react";
import { useMediaQuery } from "react-responsive";
import MobileComponent from "../components/UploadMoreImages/MobileComponent"; // Import the mobile component
import WebComponent from "../components/UploadMoreImages/WebComponent"; // Import the web component

const UploadMoreImages = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return <div>{isMobile ? <MobileComponent /> : <WebComponent />}</div>;
};

export default UploadMoreImages;
