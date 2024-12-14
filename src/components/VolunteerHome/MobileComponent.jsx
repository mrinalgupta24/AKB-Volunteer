import React from "react";
import { useNavigate } from "react-router-dom";

const MobileComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <h1 className="text-center font-bold text-lg mb-4">
        Volunteer Dashboard
      </h1>

      {/* Profile and Balance Section */}
      <div className="bg-gray-200 rounded-lg p-4 flex flex-col items-center mb-6">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="rounded-full w-24 h-24 mb-4"
        />
        <div className="text-center">
          <p>
            Current Balance : <span className="font-semibold">1000</span>
          </p>
          <p>
            Receivable Amount : <span className="font-semibold">500</span>
          </p>
          <p>
            Today Limit : <span className="font-semibold">50</span>
          </p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Hi, ABC Trust</h2>
        <p className="text-gray-500">
          Welcome back to your Volunteer Dashboard!
        </p>
        <p className="text-red-500 font-semibold mt-2">
          50 Volunteer specific donation photos pending
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={() => navigate("/select-donation-category")}
          className="w-full bg-white text-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
        >
          Upload Donation Photos <span>&#8250;</span>
        </button>
        <button
          onClick={() => navigate("/orgn-details")}
          className="w-full bg-white text-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
        >
          Available Donation Photos <span>&#8250;</span>
        </button>
        <button
          onClick={() => navigate("/contact-support-issues")}
          className="w-full bg-white text-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
        >
          Resolve Support Issues <span>&#8250;</span>
        </button>
        <button
          onClick={() => navigate("/check-donation-status")}
          className="w-full bg-white text-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
        >
          Check Donation Status <span>&#8250;</span>
        </button>
        <button
          onClick={() => navigate("/upload-todays-photos")}
          className="w-full bg-white text-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
        >
          Upload Today's Photos <span>&#8250;</span>
        </button>
        <button
          onClick={() => navigate("/upload-delivery-photos")}
          className="w-full bg-white text-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
        >
          Upload Delivery Photos <span>&#8250;</span>
        </button>
        <button
          onClick={() => navigate("/upload-bills")}
          className="w-full bg-white text-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
        >
          Upload Expenses Bills <span>&#8250;</span>
        </button>
        <button
          onClick={() => navigate("/contact-help")}
          className="w-full bg-white text-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
        >
          Contact Help <span>&#8250;</span>
        </button>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-black font-bold">AKB</p>
      </div>
    </div>
  );
};

export default MobileComponent;
