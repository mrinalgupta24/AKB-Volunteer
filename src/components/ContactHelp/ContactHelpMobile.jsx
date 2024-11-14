import React, { useState } from "react";

const ContactHelpMobile = () => {
  const [formData, setFormData] = useState({
    purpose: "",
    amount: "",
    documents: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      documents: e.target.files[0],
    }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full py-4 bg-gray-200 text-center font-bold text-lg">
        Volunteer Dashboard
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="purpose" className="block text-sm mb-2 mt-8">
            Type of Issue
          </label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            placeholder="Payment Issue"
            className="w-full h-12 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm mb-2">
          Description of Issue
          </label>
          <input
            type="text" // Changed to text input
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="I have not received my payment"
            className="w-full h-12 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Upload Relevant documents
          </label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
            <input
              type="file"
              id="documents"
              name="documents"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="documents"
              className="flex items-center justify-center h-12 cursor-pointer"
            >
              <span className="text-sm text-gray-600">Upload</span>
            </label>
          </div>
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

export default ContactHelpMobile;
