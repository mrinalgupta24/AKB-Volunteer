import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api.js";

const VolunteerSupportIssueTwo = () => {
  const [issue, setIssue] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await api.get(`/api/get_issue_by_id/?id=${id}`);
        setIssue(response.data);
      } catch (error) {
        console.error("Error fetching issue:", error);
      }
    };

    fetchIssue();
  }, [id]);

  const handleMarkAsResolvedClick = () => {
    setShowPopup(true);
  };

  const handleYesClick = async () => {
    try {
      await api.post("/api/mark_issue/", { id });
      setShowPopup(false);
      navigate("/contact-support-issues");
    } catch (error) {
      console.error("Error marking issue as resolved:", error);
    }
  };

  const handleNoClick = () => {
    setShowPopup(false);
  };

  if (!issue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 fixed top-0">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-lg font-bold">Volunteer Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto mt-16 p-6">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* ID Display */}
          <div className="flex items-center justify-center mb-4">
            <span className="text-lg font-bold">
              ID - <span className="text-gray-700">{issue.id}</span>
            </span>
          </div>

          {/* Issue Type */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Issue Type
            </label>
            <input
              type="text"
              value={issue.issue_type}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
            />
          </div>

          {/* Detailed Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Detailed Description
            </label>
            <textarea
              value={issue.description}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
            />
          </div>

          {/* Relevant Documents */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Relevant Documents
            </label>
            <div className="flex space-x-4">
              {Array.isArray(issue.documents) &&
                issue.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 bg-gray-300 rounded"
                  ></div>
                ))}
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={issue.phone}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              className="flex-1 mr-2 bg-green-500 text-white py-2 rounded font-bold hover:bg-green-600"
              onClick={() => window.open(issue.whatsapp_url, "_blank")}
            >
              Chat on WhatsApp
            </button>
            <button
              className="flex-1 ml-2 bg-red-500 text-white py-2 rounded font-bold hover:bg-red-600"
              onClick={handleMarkAsResolvedClick}
            >
              Mark as Resolved
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center bg-gray-200 font-bold fixed bottom-0 left-0">
        AKB
      </footer>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center font-bold">
            <p className="mb-4">Are you sure you want to Mark as Resolved?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                onClick={handleYesClick}
              >
                Yes
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={handleNoClick}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerSupportIssueTwo;
