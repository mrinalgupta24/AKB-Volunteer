import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifierSignIn from "./pages/VerifierSignIn";
import VolunteerHome from "./pages/VolunteerHome";
import VolunteerSelectCategory from "./pages/VolunteerSelectCategory";
import FeedFoodCategory from "./components/VolunteerCategory/FeedFoodMobileComponent";
import UploadMoreImages from "./pages/UploadMoreImages";
import ImagePreview from "./pages/ImagePreview";
import ClothesMobileComponent from "./components/VolunteerCategory/ClothesMobileComponent";
import UploadMoreImagesTwo from "./pages/UploadMoreImagesTwo";
import UploadedImagesTwo from "./pages/UploadedImagesTwo";
import UploadBill from "./pages/UploadBill";
import OrgDetails from "./pages/OrgDetails";
import ContactHelp from "./pages/ContactHelp";
import FeedStrayMobileComponent from "./components/VolunteerCategory/FeedStrayMobileComponent";
import SanitaryPadMobileComponent from "./components/VolunteerCategory/SanitaryPadMobileComponent";
import MedicineMobileComponent from "./components/VolunteerCategory/MedicineMobileComponent";
import VolunteerSupportIssue from "./components/VolunteerSupportIssue/VolunteerSupportIssue";
import VolunteerSupportIssueTwo from "./components/VolunteerSupportIssue/VolunteerSupportIssueTwo";
import CheckDonationStatus from "./components/CheckDonationStatus/CheckDonationStatus";
import CheckDonationStatusTwo from "./components/CheckDonationStatus/CheckDonationStatusTwo";
import UploadTodaysPhotos from "./components/UploadTodaysPhotos/UploadTodaysPhotos";
import UploadDeliveryPhotos from "./components/UploadDeliveryPhotos/UploadDeliveryPhotos";
import UploadDeliveryPhotosTwo from "./components/UploadDeliveryPhotos/UploadDeliveryPhotosTwo";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VerifierSignIn />} />
        <Route path="/volunteer-home" element={<VolunteerHome />} />
        <Route
          path="select-donation-category"
          element={<VolunteerSelectCategory />}
        />
        <Route path="/feed-food" element={<FeedFoodCategory />} />
        <Route path="/feed-stray" element={<FeedStrayMobileComponent />} />
        <Route
          path="/contact-support-issues"
          element={<VolunteerSupportIssue />}
        />
        <Route
          path="/contact-support-issue-two/:id"
          element={<VolunteerSupportIssueTwo />}
        />

        <Route
          path="/provide-medicines"
          element={<MedicineMobileComponent />}
        />
        <Route
          path="/provide-sanitary"
          element={<SanitaryPadMobileComponent />}
        />
        <Route path="/clothes-to-poor" element={<ClothesMobileComponent />} />
        <Route path="/uploadmoreimage" element={<UploadMoreImages />} />
        <Route path="/uploadmoreimagetwo" element={<UploadMoreImagesTwo />} />
        <Route path="/uploaded-images-two" element={<UploadedImagesTwo />} />
        <Route path="" element={<ImagePreview />} />
        <Route
          path="/check-donation-status"
          element={<CheckDonationStatus />}
        />
        <Route
          path="/check-donation-status-two"
          element={<CheckDonationStatusTwo />}
        />
        <Route path="/upload-todays-photos" element={<UploadTodaysPhotos />} />
        <Route
          path="/upload-delivery-photos"
          element={<UploadDeliveryPhotos />}
        />
        <Route
          path="/upload-delivery-photos-two"
          element={<UploadDeliveryPhotosTwo />}
        />
        <Route path="/upload-bills" element={<UploadBill />} />
        <Route path="/orgn-details" element={<OrgDetails />} />
        <Route path="/contact-help" element={<ContactHelp />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
