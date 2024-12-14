import React, { useState, useEffect } from "react";
import { Camera, Image as ImageIcon, RotateCw } from "lucide-react";
import api from "../../api.js";
import img1 from "../../assets/fundraising.png";

const CameraComponent = ({ onClose, onCapture }) => {
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
        "Unable to access camera. Please ensure you've granted camera permissions and no other application is using the camera."
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
      canvas.width = video.videoHeight;
      canvas.height = video.videoWidth;
      const ctx = canvas.getContext("2d");

      if (facingMode === "user") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(video, -video.videoWidth / 2, -video.videoHeight / 2);

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

const ImagesGrid = ({ images }) => {
  return (
    <>
      <div className="text-xl font-semibold mt-6 mb-4">Images</div>
      <div className="grid grid-cols-3 gap-4 px-4">
        {images.length > 0 ? (
          images.map((imgObj, index) => (
            <div key={index} className="bg-gray-200 p-2 shadow-lg rounded-md">
              <img
                src={imgObj.image || ""}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-auto object-cover rounded"
              />
            </div>
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </>
  );
};

const UploadTodaysPhotos = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [viewUploadedImages, setViewUploadedImages] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const fetchUploadedImages = async () => {
    try {
      const apiUrl = `/api/get_today_img/`;
      const response = await api.get(apiUrl);
      setUploadedImages(response.data); // Directly set response.data
    } catch (error) {
      console.error("Error fetching uploaded images:", error);
    }
  };

  const toggleViewImages = async () => {
    if (!viewUploadedImages) {
      await fetchUploadedImages();
    }
    setViewUploadedImages(!viewUploadedImages);
  };

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
      console.log("Uploading image to API:", capturedImage);
      await api.post("/api/upload_today_images/", {
        img: capturedImage,
        type: "donation_img",
      });
      setCapturedImage(null);
      setShowCamera(false);
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full py-4 bg-gray-200 text-center font-bold text-lg">
        Volunteer Dashboard
      </header>

      {viewUploadedImages ? (
        <ImagesGrid images={uploadedImages} />
      ) : !showCamera && !capturedImage ? (
        <>
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

export default UploadTodaysPhotos;
