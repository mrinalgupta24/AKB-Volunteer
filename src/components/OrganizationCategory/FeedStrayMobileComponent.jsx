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

const ImagesGrid = ({ images }) => (
  <>
    <div className="text-xl font-semibold mt-6 mb-4">Images</div>
    <div className="grid grid-cols-3 gap-4 px-4">
      {images.map((image, index) => (
        <div key={index} className="bg-gray-200 p-2 shadow-lg rounded-md">
          <img
            src={image} // Use the image URL directly
            alt={`Uploaded ${index + 1}`}
            className="w-full h-auto object-cover rounded"
          />
        </div>
      ))}
    </div>
  </>
);

const FeedStrayMobileComponent = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [viewUploadedImages, setViewUploadedImages] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    category: "",
    remaining_photos: 0,
    donation_id: null,
  });

  useEffect(() => {
    const fetchDonorInfo = async () => {
      try {
        const response = await api.get("/api/get_donor_info/", {
          params: { category: "stray" },
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

        setUploadedImages(response.data.donation_img || []);
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
      await api.post("/api/upload_donation_images/", {
        img: capturedImage,
        donation_id: donorInfo.donation_id,
        type: "donation_img",
      });
      setCapturedImage(null);
      setShowCamera(false);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const toggleViewImages = () => {
    setViewUploadedImages(!viewUploadedImages);
    setShowCamera(false);
    setCapturedImage(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full py-4 bg-gray-200 text-center font-bold text-lg">
        Organization Dashboard
      </header>

      {viewUploadedImages ? (
        <ImagesGrid images={uploadedImages} />
      ) : !showCamera && !capturedImage ? (
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
            <button
              className="mx-auto w-3/4 py-3 bg-[#407daa] text-white rounded-full text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
              onClick={() => setShowCamera(true)}
            >
              <Camera size={20} />
              Upload
            </button>
            <button
              className="mx-auto w-3/4 py-3 bg-[#407daa] text-white rounded-full text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
              onClick={toggleViewImages}
            >
              <ImageIcon size={20} />
              View Uploaded Images
            </button>
          </div>
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

export default FeedStrayMobileComponent;
