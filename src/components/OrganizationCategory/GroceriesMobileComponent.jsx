import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Image as ImageIcon, Upload, RotateCw } from "lucide-react";
import CapturedImageComponent from "../ImagePreview/CapturedImageComponent";
import DonorCardOverlay from "../ImagePreview/DonorCardOverlay";
import api from "../../api.js";
import img1 from "../../assets/fundraising.png";

const CameraComponent = ({ onClose, onCapture, name }) => {
  const videoRef = React.useRef(null);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");

  const startCamera = async (facingModeValue) => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingModeValue,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert(
        "Unable to access camera. Please ensure you've granted camera permissions."
      );
    }
  };

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const toggleCamera = () => {
    setFacingMode((prevMode) =>
      prevMode === "environment" ? "user" : "environment"
    );
  };

  const handleCapture = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");

      if (facingMode === "user") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg", 0.8);
      onCapture && onCapture(imageData);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="relative w-full h-[75vh]">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className={`w-full h-full object-cover ${
            facingMode === "user" ? "scale-x-[-1]" : ""
          }`}
        />
        {/* Render Donor Card Overlay on top of the camera video */}
        <DonorCardOverlay name={name} />
        <button
          onClick={toggleCamera}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-lg"
          aria-label="Switch Camera"
        >
          <RotateCw size={20} className="text-[#407daa]" />
        </button>
      </div>

      <div className="flex gap-4 mt-4 mb-4">
        <button
          onClick={handleCapture}
          className="px-6 py-2 bg-[#407daa] text-white rounded-full font-semibold hover:bg-blue-700"
        >
          Capture
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const GroceriesMobileComponent = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    category: "",
    remaining_photos: 0,
    donation_id: null,
  });
  const [uploadedStatus, setUploadedStatus] = useState({
    bill: false,
    groceries: false,
    donation_img: false,
    additional_img: false,
  });
  const [currentType, setCurrentType] = useState("");
  const [uploadedData, setUploadedData] = useState({
    bill: null,
    groceries: null,
    donation_img: null,
    additional_img: null,
  });

  useEffect(() => {
    const fetchDonorInfo = async () => {
      try {
        const response = await api.get("/api/get_donor_info/", {
          params: { category: "groceries" },
        });
        if (response.data) {
          setDonorInfo(response.data);
          // Fetch images after setting donor info
          fetchUploadedImages(response.data.donation_id);
        }
      } catch (error) {
        console.error("Error fetching donor info:", error);
      }
    };

    const fetchUploadedImages = async (donationId) => {
      try {
        // Construct the URL dynamically using donation_id from the donor info
        const apiUrl = `/api/get_uploaded_img/?donation_id=${donationId}`;
        console.log("Fetching images from:", apiUrl);

        const response = await api.get(apiUrl);
        console.log("Fetched Images Response:", response.data);

        setUploadedImages(
          [
            response.data.bill,
            response.data.groceries,
            response.data.donation_img,
            response.data.additional_img,
          ].filter(Boolean)
        ); // Filter out any null or undefined values
      } catch (error) {
        console.error("Error fetching uploaded images:", error);
      }
    };

    fetchDonorInfo();
  }, []);

  const handleCameraClose = () => {
    setShowCamera(false);
  };

  const handleImageCapture = (imageData) => {
    setCapturedImage(imageData);
    handleCameraClose();
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setShowCamera(true);
  };

  const handleAccept = async () => {
    try {
      console.log("Capture Details:", {
        donationId: donorInfo.donation_id,
        imageLength: capturedImage ? capturedImage.length : "No image",
        currentType: currentType,
      });

      const blob = await fetch(capturedImage)
        .then((res) => res.blob())
        .then((blob) => new Blob([blob], { type: "image/jpeg" })); // Ensure the correct MIME type

      const formData = new FormData();
      formData.append("img", blob);
      formData.append("donation_id", donorInfo.donation_id);
      formData.append("type", currentType);

      const response = await api.post(
        "/api/upload_donation2_images/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Enhanced logging
      console.log("Upload Response:", response);

      if (response.status === 200) {
        // Use status code for success
        setCapturedImage(null);
        setShowCamera(false);
        setUploadedStatus((prevStatus) => ({
          ...prevStatus,
          [currentType]: true,
        }));
        setUploadedData((prevData) => ({
          ...prevData,
          [currentType]: capturedImage,
        }));
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Detailed Capture Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      alert(`Failed to upload ${currentType} image: ${error.message}`);
    }
  };

  const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("img", file);
      formData.append("donation_id", donorInfo.donation_id);
      formData.append("type", type);

      try {
        const response = await api.post(
          "/api/upload_donation2_images/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Full API Response:", response);

        if (response.status === 200) {
          setUploadedStatus((prevStatus) => ({
            ...prevStatus,
            [type]: true,
          }));

          setUploadedData((prevData) => ({
            ...prevData,
            [type]: URL.createObjectURL(file),
          }));
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        console.error("Detailed Error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        alert(`Failed to upload ${type} image: ${error.message}`);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const convertToBlob = async (dataUrl) => {
        const response = await fetch(dataUrl);
        return await response.blob();
      };

      const billBlob = uploadedData.bill
        ? await convertToBlob(uploadedData.bill)
        : null;
      const groceriesBlob = uploadedData.groceries
        ? await convertToBlob(uploadedData.groceries)
        : null;
      const donationImgBlob = uploadedData.donation_img
        ? await convertToBlob(uploadedData.donation_img)
        : null;
      const additionalImgBlob = uploadedData.additional_img
        ? await convertToBlob(uploadedData.additional_img)
        : null;

      const formData = new FormData();
      formData.append("donation_id", donorInfo.donation_id);
      if (billBlob) formData.append("bill", billBlob);
      if (groceriesBlob) formData.append("item", groceriesBlob);
      if (donationImgBlob) formData.append("donation_img", donationImgBlob);
      if (additionalImgBlob)
        formData.append("additional_img", additionalImgBlob);

      console.log("Submitting donation with data:", formData);

      const response = await api.post(
        "/api/upload_donation2_images/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Donation submitted successfully!");
        window.location.reload(); // Reload the page after successful submission
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert(`Failed to submit donation: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full py-4 bg-gray-200 text-center font-bold text-lg">
        Organization Dashboard
      </header>

      {!showCamera && !capturedImage ? (
        <>
          <div className="w-11/12 max-w-md px-4 py-6 mt-6 bg-white rounded-lg shadow-md mx-auto">
            {donorInfo.name ? (
              <>
                <p className="text-gray-800 font-semibold">
                  Name on Parcel:{" "}
                  <span className="font-normal">{donorInfo.name}</span>
                </p>
                <p className="text-gray-800 font-semibold">
                  Category:{" "}
                  <span className="font-normal">{donorInfo.category}</span>
                </p>
                <p className="text-gray-800 font-semibold">
                  Photos Remaining:{" "}
                  <span className="font-normal">
                    {donorInfo.remaining_photos}
                  </span>
                </p>
                <p className="text-gray-800 font-semibold">
                  Amount:{" "}
                  <span className="font-normal">
                    {donorInfo.amount || "N/A"}
                  </span>
                </p>
              </>
            ) : (
              <p className="text-gray-800 font-semibold">
                No donor information available.
              </p>
            )}
          </div>

          {/* Image */}
          <div className="my-6">
            <img
              src={img1}
              alt="Parcel"
              className="w-40 h-40 object-cover rounded-md"
            />
          </div>

          <div className="flex flex-col w-full max-w-md space-y-4 px-4 mb-6 mt-6">
            <label
              className={`mx-auto w-3/4 py-3 ${
                uploadedStatus.bill ? "bg-green-500" : "bg-[#407daa]"
              } text-white rounded-full text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer`}
            >
              <Upload size={20} />
              Upload Bill
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "bill")}
              />
            </label>
            <label
              className={`mx-auto w-3/4 py-3 ${
                uploadedStatus.groceries ? "bg-green-500" : "bg-[#407daa]"
              } text-white rounded-full text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer`}
            >
              <Upload size={20} />
              Upload Groceries
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "groceries")}
              />
            </label>
            <button
              className={`mx-auto w-3/4 py-3 ${
                uploadedStatus.donation_img ? "bg-green-500" : "bg-[#407daa]"
              } text-white rounded-full text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2`}
              onClick={() => {
                setShowCamera(true);
                setCurrentType("donation_img");
              }}
            >
              <Camera size={20} />
              Capture Person Holding Groceries
            </button>
            <button
              className={`mx-auto w-3/4 py-3 ${
                uploadedStatus.additional_img ? "bg-green-500" : "bg-[#407daa]"
              } text-white rounded-full text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2`}
              onClick={() => {
                setShowCamera(true);
                setCurrentType("additional_img");
              }}
            >
              <Camera size={20} />
              Add Extra Image
            </button>
          </div>

          {uploadedStatus.bill &&
            uploadedStatus.groceries &&
            uploadedStatus.donation_img && (
              <button
                className="mx-auto w-3/4 py-3 bg-red-500 text-white rounded-full text-sm font-semibold hover:bg-red-700 flex items-center justify-center gap-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
        </>
      ) : showCamera ? (
        <CameraComponent
          onClose={handleCameraClose}
          onCapture={handleImageCapture}
          name={donorInfo.name}
        />
      ) : (
        <CapturedImageComponent
          imageData={capturedImage}
          onRetake={handleRetake}
          onAccept={handleAccept}
        />
      )}

      <footer className="w-full py-4 text-center bg-gray-200 font-bold mt-auto">
        AKB
      </footer>
    </div>
  );
};

export default GroceriesMobileComponent;
