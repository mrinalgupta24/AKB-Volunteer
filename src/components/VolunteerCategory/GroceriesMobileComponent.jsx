import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Image as ImageIcon, Upload } from "lucide-react";
import img1 from "../../assets/fundraising.png";

const GroceriesMobileComponent = ({ name, category, photosRemaining }) => {
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Redirect immediately after an image is selected
      navigate("/uploaded-images-two");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full py-4 bg-gray-200 text-center font-bold text-lg">
        Volunteer Dashboard
      </header>

      <div className="w-11/12 max-w-md px-4 py-6 mt-6 bg-white rounded-lg shadow-md mx-auto">
        <p className="text-gray-800 font-semibold">
          Name on Parcel: <span className="font-normal">{name}</span>
        </p>
        <p className="text-gray-800 font-semibold">
          Category: <span className="font-normal">{category}</span>
        </p>
        <p className="text-gray-800 font-semibold">
          Amount Paid for 1 Dress:{" "}
          <span className="font-normal">{photosRemaining}</span>
        </p>
        <p className="text-gray-800 font-semibold">
          Special Request:{" "}
          <span className="font-normal">{photosRemaining}</span>
        </p>
      </div>

      <div className="my-6">
        <img
          src={img1}
          alt="Parcel"
          className="w-40 h-40 object-cover rounded-md"
        />
      </div>

      <div className="flex flex-col w-full max-w-md space-y-4 px-4 mb-6">
        <button
          className="mx-auto w-3/4 py-3 bg-[#407daa] text-white rounded-full text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
          onClick={() => navigate("/upload-bills")}
        >
          <Camera size={20} />
          Upload Bill
        </button>

        <label className="mx-auto w-3/4 py-3 bg-[#407daa] text-white rounded-full text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer">
          <Camera size={20} />
          Upload Dress
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        <label className="mx-auto w-3/4 py-3 bg-[#407daa] text-white rounded-full text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer">
          <Camera size={20} />
          Upload Person Holding Dress
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        <button
          className="mx-auto w-3/4 py-3 bg-[#407daa] text-white rounded-full text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
          onClick={() => navigate("/uploaded-images-two")}
        >
          <ImageIcon size={20} />
          View Uploaded Images
        </button>

        <label className="mx-auto w-3/4 py-3 bg-[#407daa] text-white rounded-full text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer">
          <Upload size={20} className="mr-2" />
          Add Extra Image/Reupload
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      <footer className="w-full py-4 text-center bg-gray-200 font-bold mt-auto">
        AKB
      </footer>
    </div>
  );
};

export default GroceriesMobileComponent;
