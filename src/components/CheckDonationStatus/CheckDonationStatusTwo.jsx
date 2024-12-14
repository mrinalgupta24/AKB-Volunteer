import React from "react";
import { useLocation } from "react-router-dom";

const CheckDonationStatusTwo = () => {
  const location = useLocation();
  const data = location.state?.data || {};

  const handleViewImages = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full py-4 bg-gray-200 text-center font-bold text-lg">
        Volunteer Dashboard
      </header>

      {/* Form Section */}
      <div className="space-y-5 w-full max-w-md mx-auto p-4">
        {Object.entries(data).map(
          ([key, value]) =>
            key !== "link" && (
              <div key={key}>
                <label className="block text-sm mb-2 capitalize">
                  {key.replace(/_/g, " ")}
                </label>
                <p className="w-full h-12 px-3 font-medium rounded-lg border border-gray-300 flex items-center">
                  {Array.isArray(value) ? value.join(", ") : value}
                </p>
              </div>
            )
        )}

        {/* Links */}
        {data.link && data.link.length > 0 && (
          <div className="space-y-2">
            {data.link.map((url, index) => (
              <button
                key={index}
                onClick={() => handleViewImages(url)}
                className="w-full h-12 bg-orange-500 text-white rounded-lg text-sm font-medium mt-2 active:bg-orange-600"
              >
                View Uploaded Image {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full py-4 text-center bg-gray-200 font-bold mt-auto">
        AKB
      </footer>
    </div>
  );
};

export default CheckDonationStatusTwo;
