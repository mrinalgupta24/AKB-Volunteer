import React, { useRef, useEffect, useState } from "react";
import { Camera, Download } from "lucide-react";

const MobileComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      setStream(videoStream);
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
        setIsCameraOn(true);
      }
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
      setIsCameraOn(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      const image = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "volunteer-badge.png";
      link.href = image;
      link.click();
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Container */}
        <div className="bg-gradient-to-b from-blue-900 to-blue-950 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-blue-800 p-4 text-center">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              AKB FOUNDATION
            </h1>
          </div>

          {/* Camera View */}
          <div className="relative aspect-[3/4]">
            {isCameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover mirror"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <Camera size={64} className="text-gray-400" />
              </div>
            )}

            {/* Badge Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[90%] text-center">
                {/* Blue Overlay Frame */}
                <div className="relative bg-gradient-to-b from-blue-700/90 to-blue-900/90 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                  {/* Profile Circle */}
                  <div className="relative mx-auto w-40 h-40 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-400 shadow-lg overflow-hidden">
                      <div className="w-full h-full bg-blue-200/20" />
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -inset-2 border-4 border-blue-300/30 rounded-full animate-spin-slow" />
                  </div>

                  {/* Badge Content */}
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
          </div>

          {/* Controls */}
          <div className="bg-blue-900 p-6 flex justify-center space-x-6">
            <button
              onClick={isCameraOn ? stopCamera : startCamera}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transform transition-transform hover:scale-105"
            >
              <Camera size={28} />
            </button>
            {isCameraOn && (
              <button
                onClick={capturePhoto}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transform transition-transform hover:scale-105"
              >
                <Download size={28} />
              </button>
            )}
          </div>
        </div>

        {/* Camera canvas */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

// Add this to your CSS or styles
const styles = `
  .animate-spin-slow {
    animation: spin 8s linear infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .mirror {
    transform: scaleX(-1);
  }
`;

export default MobileComponent;
