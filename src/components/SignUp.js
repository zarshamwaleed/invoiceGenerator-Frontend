import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import logo from "../images/logo.png";
import { ThemeContext } from '../context/ThemeContext';
import { GoogleLogin } from "@react-oauth/google"; 
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function SignUp() {
  const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Normal Signup
  const collectSignUpData = async () => {
    setError("");

    if (!agreedToTerms) {
      setError("✅ Please agree to Terms of Service");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("https://invoice-generator-backend-liard.vercel.app/signup", {
        method: 'POST',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          agreedToTerms
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.result || data.error || "Signup failed");
        return;
      }

      localStorage.setItem("signups", JSON.stringify(data));
      navigate('/signin');

    } catch (err) {
      console.error("❌ collectSignUpData error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Google Signup (OAuth)
  const handleGoogleSignupSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const decoded = jwtDecode(token);

      console.log("✅ Google Decoded:", decoded);

      const res = await axios.post("https://invoice-generator-backend-liard.vercel.app/api/auth/google", { token });


      const userData = res.data.user;

      // ✅ Auto-login the user
      localStorage.setItem("signups", JSON.stringify(userData));

      navigate('/signin');

    } catch (err) {
      console.error("❌ Google Signup Error:", err);
      setError(
        err.response?.data?.error || "Google signup failed. Try again."
      );
    }
  };

  const handleGoogleSignupError = () => {
    setError("Google signup failed. Please try again.");
  };

  return (
    <div className={`min-h-[110vh] w-full flex flex-col items-center py-24 px-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Invoice-Generator<span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-light`}>.com </span>
        </h1>
      </div>

      {/* Signup Form */}
      <div className={`rounded-lg shadow p-12 w-full max-w-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold text-center mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Create a free account</h2>
        <p className={`text-center text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Gain access to more features with an Invoice-Generator.com account.
        </p>

        {error && (
          <div className={`mb-4 p-2 rounded text-sm ${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
            {error}
          </div>
        )}

        {/* Name Fields */}
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>First Name</label>
            <input 
              type="text" 
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full border px-4 py-2 rounded transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'}`} 
            />
          </div>
          <div className="w-1/2">
            <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Last Name</label>
            <input 
              type="text" 
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full border px-4 py-2 rounded transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'}`} 
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email</label>
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border px-4 py-2 rounded transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'}`} 
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Password</label>
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full border px-4 py-2 rounded transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'}`} 
          />
        </div>

        {/* Terms */}
        <div className="flex items-center mb-4">
          <input 
            type="checkbox" 
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className={`mr-2 ${darkMode ? 'accent-blue-500' : ''}`} 
          />
          <label htmlFor="terms" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            I agree to the Terms of Service
          </label>
        </div>

        {/* Signup Button */}
        <button
          onClick={collectSignUpData}
          disabled={isLoading}
          className={`w-full py-2 rounded mb-4 transition-colors duration-300 flex items-center justify-center ${
            darkMode ? 'bg-emerald-700 hover:bg-emerald-600 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}>
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* ✅ Google Signup Button */}
        <div className="mb-4 text-center">
          <GoogleLogin
            onSuccess={handleGoogleSignupSuccess}
            onError={handleGoogleSignupError}
          />
        </div>

        {/* Already have account */}
        <p className={`text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Already have an account?{' '}
          <span 
            className={`cursor-pointer ${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'}`} 
            onClick={() => navigate('/signin')}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
