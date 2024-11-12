import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, X } from "lucide-react";

const MobileComponent = ({ name, category, photosRemaining }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const navigate = useNavigate();
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const startCamera = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      setStream(videoStream);
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
        videoRef.current.play();
      }
      setIsCameraOpen(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
      setIsCameraOpen(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      const image = canvasRef.current.toDataURL("image/png");
      // Here you can handle the captured image (e.g., save it or upload it)
      stopCamera();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full py-4 bg-gray-200 text-center font-bold text-lg">
        Volunteer Dashboard
      </header>

      {/* Camera Overlay */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="relative h-full">
            {/* Camera View */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Badge Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[90%] text-center">
                <div className="relative bg-gradient-to-b from-blue-700/90 to-blue-900/90 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                  <div className="relative mx-auto w-40 h-40 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-400 shadow-lg overflow-hidden">
                      <div className="w-full h-full bg-blue-200/20" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/90 text-blue-900 py-2 px-6 rounded-lg font-bold text-lg inline-block">
                      FEED A HUNGRY STOMACH
                    </div>

                    <div className="text-white space-y-2">
                      <p className="text-xl font-bold">DONOR NAME</p>
                      <div className="h-px w-32 mx-auto bg-blue-400/50" />
                      <p className="text-blue-200 italic">
                        Making Change Together
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Camera Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center space-x-6 bg-black/50">
              <button
                onClick={capturePhoto}
                className="bg-white rounded-full p-4 shadow-lg"
              >
                <Camera size={28} className="text-blue-500" />
              </button>
              <button
                onClick={stopCamera}
                className="bg-red-500 rounded-full p-4 shadow-lg"
              >
                <X size={28} className="text-white" />
              </button>
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

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
          src="https://via.placeholder.com/150"
          alt="Parcel"
          className="w-40 h-40 object-cover rounded-md"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col w-full max-w-md space-y-4 px-4">
        <button
          className="mx-auto w-3/4 py-3 bg-[#407daa] text-white rounded-full font-semibold hover:bg-blue-600"
          onClick={startCamera}
        >
          Upload
        </button>
        <button
          className="mx-auto w-3/4 py-3 bg-[#407daa] text-white rounded-full font-semibold hover:bg-blue-600"
          onClick={() => navigate("/uploaded-images")}
        >
          View Uploaded Images
        </button>
        <button
          className="mx-auto w-3/4 py-3 bg-[#407daa] text-white rounded-full font-semibold hover:bg-blue-600"
          onClick={() => navigate("/upload-images")}
        >
          Add Extra Image/Reupload
        </button>
      </div>

      {/* Footer */}
      <footer className="w-full py-2 text-center bg-gray-200 mt-auto">
        AKB
      </footer>
    </div>
  );
};

export default MobileComponent;
