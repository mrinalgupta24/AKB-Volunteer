import React from "react";

const OrgDetailsMobile = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="w-full py-4 bg-gray-200 text-center font-bold text-lg">
        Volunteer Dashboard
      </header>

      <div className="flex-1 p-4 space-y-4">
        {/* Pending Donations Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-md font-medium mb-3">Pending Donations</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Number of Donations</span>
              <span className="font-medium">1000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Donors contributed</span>
              <span className="font-medium">30</span>
            </div>
          </div>
        </div>

        {/* Food Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-md font-medium mb-3">Food</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Number of Donations</span>
              <span className="font-medium">500</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Donors contributed</span>
              <span className="font-medium">20</span>
            </div>
          </div>
        </div>

        {/* Groceries Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-md font-medium mb-3">Groceries</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Number of Donations</span>
              <span className="font-medium">500</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Donors contributed</span>
              <span className="font-medium">10</span>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2 mt-4">Amount</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Donor 1</span>
                  <span className="font-medium">INR 500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Donor 2</span>
                  <span className="font-medium">INR 500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Donor 3</span>
                  <span className="font-medium">INR 500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full py-4 text-center bg-gray-200 font-bold">
        AKB
      </footer>
    </div>
  );
};

export default OrgDetailsMobile;
