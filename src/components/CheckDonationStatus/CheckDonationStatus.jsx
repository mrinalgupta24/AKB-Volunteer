import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api.js"; // Importing axios instance

const CheckDonationStatus = () => {
  const [formData, setFormData] = useState({
    phoneno: "",
    date: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phoneno && formData.date) {
      const url = `/api/check_donor_details/?phone_number=${formData.phoneno}&date=${formData.date}`;
      try {
        const response = await api.get(url); // Using axios instance to make the GET request
        const data = response.data;
        console.log("Form data to be sent:", formData);
        navigate("/check-donation-status-two", { state: { data } });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      alert("Phone number and date are required");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full py-4 bg-gray-200 text-center font-bold text-lg">
        Volunteer Dashboard
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="phoneno" className="block text-sm mb-2 mt-8">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneno"
            name="phoneno"
            value={formData.phoneno}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="w-full h-12 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full h-12 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-green-500 text-white rounded-lg text-sm font-medium mt-6 active:bg-green-600"
        >
          Submit
        </button>
      </form>

      <footer className="w-full py-4 text-center bg-gray-200 font-bold mt-auto">
        AKB
      </footer>
    </div>
  );
};

export default CheckDonationStatus;
