import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";

const VolunteerSupportIssue = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await api.get("/api/get_issues_vol/");
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues();
  }, []);

  const handleIssueClick = (issue) => {
    navigate(`/contact-support-issue-two/${issue.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full py-4 bg-gray-200 text-center font-bold text-lg fixed top-0 left-0">
        Volunteer Dashboard
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center pt-20 pb-16">
        {/* Pending Support Issues Section */}
        <div className="bg-gray-200 rounded-lg shadow-lg w-11/12 md:w-1/2 p-4">
          <h2 className="text-lg font-bold text-center text-gray-700 mb-4">
            Pending Support Issues
          </h2>
          <div className="space-y-3">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-md shadow-sm cursor-pointer"
                onClick={() => handleIssueClick(issue)}
              >
                <span className="text-gray-700 font-medium">
                  {issue.issue_type}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">{issue.id}</span>
                  <span className="text-gray-700 text-lg">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center bg-gray-200 font-bold fixed bottom-0 left-0">
        AKB
      </footer>
    </div>
  );
};

export default VolunteerSupportIssue;
