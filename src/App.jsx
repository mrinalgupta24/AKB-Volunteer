import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifierSignIn from "./pages/VerifierSignIn";
import VolunteerHome from "./pages/VolunteerHome";
import VolunteerSelectCategory from "./pages/VolunteerSelectCategory";
import VolunteerCategory from "./pages/VolunteerCategory";
import UploadMoreImages from "./pages/UploadMoreImages";
import UploadImages from "./pages/UploadedImages";

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
        <Route path="/feed-stray-animals" element={<VolunteerCategory />} />
        <Route path="/upload-images" element={<UploadMoreImages />} />
        <Route path="/uploaded-images" element={<UploadImages />} />

        {/* New route */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
