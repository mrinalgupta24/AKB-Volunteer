import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifierSignIn from "./pages/VerifierSignIn";
import VolunteerHome from "./pages/VolunteerHome";
import VolunteerSelectCategory from "./pages/VolunteerSelectCategory";
import VolunteerCategory from "./pages/VolunteerCategory";
import UploadMoreImages from "./pages/UploadMoreImages";
import UploadImages from "./pages/UploadedImages";
import ImagePreview from "./pages/ImagePreview";
import GroceriesMobileComponent from "./components/VolunteerCategory/GroceriesMobileComponent";
import UploadMoreImagesTwo from "./pages/UploadMoreImagesTwo";
import UploadedImagesTwo from "./pages/UploadedImagesTwo";
import UploadBill from "./pages/UploadBill";
import OrgDetails from "./pages/OrgDetails";
import ContactHelp from "./pages/ContactHelp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VerifierSignIn />} />
        <Route path="/volunteer-home" element={<VolunteerHome />} />
        <Route
          path="upload-donation-photos"
          element={<VolunteerSelectCategory />}
        />
        <Route path="/feed-food" element={<VolunteerCategory />} />
        <Route path="/uploadmoreimage" element={<UploadMoreImages />} />
        <Route path="/uploadmoreimagetwo" element={<UploadMoreImagesTwo />} />
        <Route path="/uploaded-images" element={<UploadImages />} />
        <Route path="/uploaded-images-two" element={<UploadedImagesTwo />} />
        <Route path="" element={<ImagePreview />} />
        <Route
          path="/groceries-to-poor"
          element={<GroceriesMobileComponent />}
        />
        <Route path="/upload-bills" element={<UploadBill />} />
        <Route path="/orgn-details" element={<OrgDetails />} />
        <Route path="/contact-help" element={<ContactHelp />} />
        {/* New route */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
