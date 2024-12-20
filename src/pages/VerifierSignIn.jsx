import React, { useState } from "react";
import img1 from "../assets/fundraising.png";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router";
import api from "../api.js";
import { Link } from "react-router-dom";

const VerifierSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!phoneNumber || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    const data = {
      phone_number: phoneNumber,
      password: password,
    };

    try {
      const response = await api.post('/api/login_volunteer/', data);
      
      console.log("Login response:", response.data);

      if (response.data.access && response.data.refresh) {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        navigate("/volunteer-home");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Login error details:", error.response?.data || error.message);
      setError(
        error.response?.data?.message ||
        error.response?.data?.detail ||
        "Invalid login credentials. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-50 p-6 lg:gap-16">
      {/* Image Section */}
      <div className="w-full lg:w-1/3 p-4">
        <img
          src={img1}
          alt="fundraising"
          className="w-full h-auto rounded-md shadow-md"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/3 p-8 bg-white rounded-lg shadow-lg mt-6 lg:mt-0">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Welcome back
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <p className="mb-4 text-gray-600 text-center">
          Enter your credentials to log in
        </p>

        <form onSubmit={handleSignIn} className="space-y-4">
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            type="tel"
            className="mb-4"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            className="mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex justify-between items-center mb-4">
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <a href="/" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <div className="flex items-center justify-center my-4">
            <span className="text-gray-400 mx-2">or</span>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition duration-200"
          >
            <img
              src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
              className="h-4 w-4 mr-3"
              alt="Google Icon"
            />
            Sign in with Google
          </button>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-blue-600 hover:underline font-semibold"
            >
              Create a free account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifierSignIn;