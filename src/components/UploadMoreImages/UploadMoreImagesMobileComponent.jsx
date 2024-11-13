import React, { useState } from "react";
import ReactDOM from "react-dom"; // Import ReactDOM to render components in a new tab

const MobileComponent = ({ name, category, photosRemaining }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full py-4 bg-gray-200 text-center font-bold text-lg">
        Volunteer Dashboard
      </header>

      {/* Parcel Information */}
      <div className="w-11/12 max-w-md px-4 py-6 mt-6 bg-white rounded-lg shadow-md mx-auto">
        <p className="text-gray-800 font-semibold">
          Name on Parcel: <span className="font-normal">{name}</span>
        </p>
        <p className="text-gray-800 font-semibold">
          Category: <span className="font-normal">{category}</span>
        </p>
        <p className="text-gray-800 font-semibold">
          Photos Remaining:{" "}
          <span className="font-normal">{photosRemaining}</span>
        </p>
      </div>

      {/* Image */}
      <div className="my-6">
        <img
          src="https://via.placeholder.com/150" // Placeholder for the parcel image, replace with actual image URL
          alt="Parcel"
          className="w-40 h-40 object-cover rounded-md"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col w-full max-w-md space-y-4 px-4">
        <button className="mx-auto w-3/4 py-3 bg-[#407daa] text-white rounded-full font-semibold hover:bg-blue-600">
          View Uploaded Images
        </button>
        <button className="mx-auto w-3/4 py-3 bg-[#407daa] text-white rounded-full font-semibold hover:bg-blue-600">
          Add Extra Image/Reupload
        </button>
      </div>

      {/* Footer */}
      <footer className="w-full py-2 text-center bg-gray-200 mt-auto">
        AKB
      </footer>
    </div>
  );
};

export default MobileComponent;
