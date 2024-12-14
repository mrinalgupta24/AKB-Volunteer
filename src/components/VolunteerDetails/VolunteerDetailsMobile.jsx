import React, { useEffect, useState } from "react";
import api from "../../api.js";

const VolunteerDetailsMobile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("api/get_vol_donation/");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="w-full py-4 bg-gray-200 text-center font-bold text-lg">
        Volunteer Dashboard
      </header>

      <div className="flex-1 p-4 space-y-4">
        {/* Available Donations Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-md font-medium mb-3">Available Donations</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Number of Donations</span>
              <span className="font-medium">
                {data.total.total_donations_count}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Donors Contributed</span>
              <span className="font-medium">{data.total.total_donors}</span>
            </div>
          </div>
        </div>

        {/* Food Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-md font-medium mb-3">Food</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Number of Donations</span>
              <span className="font-medium">
                {data.food.total_donations_count}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Donors contributed</span>
              <span className="font-medium">{data.food.total_donors}</span>
            </div>
          </div>
        </div>

        {/* Stray Cats and Dogs Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-md font-medium mb-3">Stray Cats and Dogs</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Number of Donations</span>
              <span className="font-medium">
                {data.stray.total_donations_count}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Donors contributed</span>
              <span className="font-medium">{data.stray.total_donors}</span>
            </div>
          </div>
        </div>

        {/* Sanitary Pads Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-md font-medium mb-3">Sanitary Pads</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Number of Donations</span>
              <span className="font-medium">
                {data.sanitary.total_donations_count}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Donors contributed</span>
              <span className="font-medium">{data.sanitary.total_donors}</span>
            </div>
          </div>
        </div>

        {/* Clothes Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-md font-medium mb-3">Clothes</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Number of Donations</span>
              <span className="font-medium">
                {data.clothes.total_donations_count}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Donors contributed</span>
              <span className="font-medium">{data.clothes.total_donors}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Amount</h3>
              <div className="space-y-2">
                {data.clothes.details.map((detail, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      INR {detail.price_per_parcel}
                    </span>
                    <span className="font-medium">{detail.total_count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Medicines Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-md font-medium mb-3">Medicines</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Number of Donations</span>
              <span className="font-medium">
                {data.medicines.total_donations_count}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Donors contributed</span>
              <span className="font-medium">{data.medicines.total_donors}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Amount</h3>
              <div className="space-y-2">
                {data.medicines.details.map((detail, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      INR {detail.price_per_parcel}
                    </span>
                    <span className="font-medium">{detail.total_count}</span>
                  </div>
                ))}
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

export default VolunteerDetailsMobile;
