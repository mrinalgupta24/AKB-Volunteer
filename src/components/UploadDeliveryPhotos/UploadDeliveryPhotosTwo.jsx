import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import img1 from "../../assets/fundraising.png";
import api from "../../api.js";
import html2canvas from "html2canvas";

const UploadDeliveryPhotosTwo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { donorInfo } = location.state || {};

  const [uploadedImages, setUploadedImages] = useState({
    parcel_image: null,
    donation_image: null,
    donation_image_2: null,
    additional_img: null,
  });

  const [uploadStatus, setUploadStatus] = useState({
    parcel_image: false,
    donation_image: false,
    donation_image_2: false,
    additional_img: false,
  });

  const fileInputRefs = {
    parcel_image: useRef(null),
    donation_image: useRef(null),
    donation_image_2: useRef(null),
    additional_img: useRef(null),
  };

  const handleFileUpload = (key, file) => {
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }

    // Validate the file type before uploading
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPG, JPEG, PNG).");
      return;
    }

    // Save the uploaded file in state
    setUploadedImages((prev) => ({
      ...prev,
      [key]: file,
    }));

    // Update the button's upload status to green
    setUploadStatus((prev) => ({ ...prev, [key]: true }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("parcel_image", uploadedImages.parcel_image);
    formData.append("donation_image", uploadedImages.donation_image);
    formData.append("donation_image_2", uploadedImages.donation_image_2);

    // Append additional_img only if it exists
    if (uploadedImages.additional_img) {
      formData.append("additional_img", uploadedImages.additional_img);
    }

    formData.append("id", donorInfo?.id);
    console.log(donorInfo?.id);

    api
      .post("/api/upload_delivery_images/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Images successfully uploaded!");
        navigate("/upload-delivery-photos");
      })
      .catch((error) => {
        console.error("Error submitting images:", error);
      });
  };

  const triggerFileInput = (key) => {
    fileInputRefs[key].current.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="w-full py-4 bg-gray-200 text-center font-bold text-lg">
        Volunteer Dashboard
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start px-4">
        {/* Parcel Details */}
        <div className="w-full max-w-md px-4 py-6 mt-6 bg-white rounded-lg shadow-md mx-auto">
          <p className="text-gray-800 font-semibold">
            <span className="font-normal">Name on Parcel :</span>{" "}
            {donorInfo?.name}
          </p>
          <p className="text-gray-800 font-semibold">
            <span className="font-normal">Parcel Contains :</span>{" "}
            {donorInfo?.category}
          </p>
        </div>

        {/* Image */}
        <div className="my-6">
          <img
            src={img1}
            alt="Parcel"
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-md"
          />
        </div>

        {/* Upload Buttons */}
        <div className="space-y-4 w-full max-w-sm px-4">
          {[
            { key: "parcel_image", label: "Upload Parcel Image" },
            { key: "donation_image", label: "Upload Package Handed Over" },
            {
              key: "donation_image_2",
              label: "Upload Package Handed Over Two",
            },
            { key: "additional_img", label: "Add Extra Image (Optional)" },
          ].map(({ key, label }) => (
            <div key={key}>
              <input
                type="file"
                id={key}
                ref={fileInputRefs[key]}
                style={{ display: "none" }}
                onChange={(e) => handleFileUpload(key, e.target.files[0])}
              />
              <button
                className={`w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer ${
                  uploadStatus[key] ? "bg-green-500" : "bg-[#407daa]"
                } text-white hover:bg-blue-700`}
                onClick={() => triggerFileInput(key)}
              >
                {label}
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        {uploadStatus.parcel_image &&
          uploadStatus.donation_image &&
          uploadStatus.donation_image_2 && (
            <button
              className="w-full py-3 bg-red-500 text-white rounded-full text-sm font-semibold mt-6 hover:bg-red-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center bg-gray-200 font-bold mt-auto">
        AKB
      </footer>
    </div>
  );
};

export default UploadDeliveryPhotosTwo;
