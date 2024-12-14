import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";

function UploadDeliveryPhotos() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch data from the API
    api
      .get("/api/get_delivery/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClick = (item) => {
    const donorInfo = {
      name: item.name_on_parcel,
      category: item.parcel_contains,
      id: item.id, // Assuming the API response includes an id field
    };
    navigate("/upload-delivery-photos-two", { state: { donorInfo } });
  };

  const filteredData = data.filter(
    (item) =>
      item.name_on_parcel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.parcel_contains.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="w-full py-4 bg-gray-200 text-center font-bold text-lg">
        Volunteer Dashboard
      </header>
      <div className="p-4 flex flex-col items-center gap-4 flex-grow">
        <div className="flex items-center bg-white rounded-full shadow-md w-full max-w-md">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow p-2 outline-none rounded-l-full text-sm sm:text-base"
          />
          <button className="p-2">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
            </svg>
          </button>
        </div>

        <div className="w-full max-w-md space-y-4">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => handleClick(item)}
            >
              <div className="text-sm sm:text-base">
                <h2 className="font-semibold">{item.name_on_parcel}</h2>
                <p className="text-gray-500">{item.parcel_contains}</p>
              </div>
              <button>
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <footer className="w-full py-4 text-center bg-gray-200 font-bold mt-auto text-sm sm:text-base">
        AKB
      </footer>
    </div>
  );
}

export default UploadDeliveryPhotos;
