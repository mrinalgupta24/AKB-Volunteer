import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Image as ImageIcon, Upload, RotateCw } from "lucide-react";
import img1 from "../../assets/fundraising.png";

const DonorCardOverlay = ({ name }) => (
  <div className="absolute top-3 left-3 w-[150px]">
    <div className="bg-gradient-to-b from-blue-900 to-blue-950 rounded-xl overflow-hidden shadow-lg">
      <div className="bg-blue-800 p-1.5 text-center">
        <h1 className="text-xs font-bold text-white tracking-wide">
          AKB FOUNDATION
        </h1>
      </div>
      <div className="relative p-3">
        <div className="relative mx-auto w-12 h-12 mb-2">
          <div className="absolute inset-0 rounded-full border-2 border-blue-400 shadow-lg overflow-hidden">
            <div className="w-full h-full bg-blue-200/20" />
          </div>
          <div className="absolute -inset-1 border-2 border-blue-300/30 rounded-full animate-spin-slow" />
        </div>
        <div className="space-y-1.5">
          <div className="bg-white/90 text-blue-900 py-0.5 px-2 rounded-md font-bold text-[8px] inline-block">
            FEED A HUNGRY STOMACH
          </div>
          <div className="text-white space-y-1">
            <p className="text-[10px] font-bold text-center">DONOR NAME</p>
            <div className="h-px w-12 mx-auto bg-blue-400/50" />
            <p className="text-[8px] text-blue-200 italic text-center">
              Making Change Together
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

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

  React.useEffect(() => {
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
        <DonorCardOverlay name={name} />
        <button
          onClick={toggleCamera}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-lg"
          aria-label="Switch Camera"
        >
          <RotateCw size={20} className="text-[#407daa]" />
        </button>
      </div>

      <div className="flex gap-4 mt-4">
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

const MobileComponent = ({ name, category, photosRemaining }) => {
  const [showCamera, setShowCamera] = useState(false);
  const navigate = useNavigate();

  const handleCameraClose = () => {
    setShowCamera(false);
  };

  const handleImageCapture = (imageData) => {
    console.log("Image captured:", imageData);
    handleCameraClose();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full py-4 bg-gray-200 text-center font-bold text-lg">
        Volunteer Dashboard
      </header>

      {!showCamera ? (
        <>
          {/* Parcel Information */}
          <div className="w-11/12 max-w-md px-4 py-6 mt-6 bg-white rounded-lg shadow-md mx-auto">
            <p className="text-gray-800 font-semibold">
              Name on Parcel: <span className="font-normal">{name}</span>
            </p>
            <p className="text-gray-800 font-semibold">
              Category: <span className="font-normal">{category}</span>
            </p>
            <p className="text-gray-800 font-semibold">
              Photos Remaining:{" "}
              <span className="font-normal">{photosRemaining}</span>
            </p>
          </div>

          {/* Image */}
          <div className="my-6">
            <img
              src={img1}
              alt="Parcel"
              className="w-40 h-40 object-cover rounded-md"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col w-full max-w-md space-y-4 px-4">
            <button
              className="mx-auto w-3/4 py-3 bg-[#407daa] text-white rounded-full font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
              onClick={() => setShowCamera(true)}
            >
              <Camera size={20} />
              Upload
            </button>
            <button
              className="mx-auto w-3/4 py-3 bg-[#407daa] text-white rounded-full font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
              onClick={() => navigate("/uploaded-images")}
            >
              <ImageIcon size={20} />
              View Uploaded Images
            </button>
            <button
              className="mx-auto w-3/4 py-3 bg-[#407daa] text-white rounded-full font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
              onClick={() => navigate("/upload-images")}
            >
              <Upload size={20} />
              Add Extra Image/Reupload
            </button>
          </div>
        </>
      ) : (
        <div className="w-full h-full">
          <CameraComponent
            onClose={handleCameraClose}
            onCapture={handleImageCapture}
            name={name}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-2 text-center bg-gray-200 mt-auto">
        AKB
      </footer>
    </div>
  );
};
export default MobileComponent;
