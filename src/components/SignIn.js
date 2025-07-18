import React, { useState, useContext, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google"; // ✅ Google Login button
import { jwtDecode } from "jwt-decode";

import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";
import { ThemeContext } from "../context/ThemeContext";

export default function SignIn({ onSignIn }) {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Redirect if already signed in
  useEffect(() => {
    const auth = localStorage.getItem("isSignedIn");
    if (auth === "true") navigate("/");
  }, [navigate]);

  // ✅ Google Sign-In Success
  // ✅ Google Sign-In Success Handler
const handleGoogleSuccess = async (credentialResponse) => {
  setIsLoading(true);
  try {
    const token = credentialResponse.credential;

    // ✅ Correct import usage
    const decoded = jwtDecode(token);
    console.log("Google JWT decoded:", decoded);

    // ✅ Send token to backend for verification
    const res = await axios.post("http://localhost:5000/api/auth/google", { token });

    const userData = res.data.user;

    onSignIn(userData.email, "", userData);

    if (keepLoggedIn) {
      localStorage.setItem("isSignedIn", "true");
      localStorage.setItem("user", JSON.stringify(userData));
    }

    navigate("/");
  } catch (err) {
    console.error("❌ Google login error:", err);
    setError(
      err.response?.data?.error ||
        "Google sign-in failed. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};


  // ✅ Google Sign-In Error
  const handleGoogleError = () => {
    setError("Google sign-in failed. Please try again.");
  };

  // ✅ Normal Email/Password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/signin", {
        method: "POST",
        body: JSON.stringify({ email, password, keepLoggedIn }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok || data.result === "Invalid email or password") {
        throw new Error(data.result || "Sign in failed");
      }

      onSignIn(email, password, {
        name: data.name || "User",
        email: email,
      });

      if (keepLoggedIn) {
        localStorage.setItem("isSignedIn", "true");
        localStorage.setItem(
          "user",
          JSON.stringify({ name: data.name || "User", email })
        );
      }

      navigate("/");
    } catch (err) {
      console.error("❌ handleSubmit error:", err);
      setError(
        err.message === "Failed to fetch"
          ? "Could not connect to server. Please try again later."
          : err.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-[110vh] w-full flex flex-col items-center py-14 px-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Logo & Site Name */}
      <div className="flex items-center gap-2 mb-6">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <h1
          className={`text-3xl font-bold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Invoice-Generator
          <span
            className={`${
              darkMode ? "text-gray-400" : "text-gray-500"
            } font-light`}
          >
            .com{" "}
          </span>
        </h1>
      </div>

      {/* Sign In Card */}
      <div
        className={`rounded-lg shadow p-10 w-full max-w-md transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-1 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Sign In
        </h2>
        <p
          className={`text-center text-sm mb-6 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Welcome back!
        </p>

        {error && (
          <div
            className={`mb-4 p-2 rounded text-sm ${
              darkMode ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800"
            }`}
          >
            {error}
          </div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className={`block text-sm mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full border px-4 py-2 mb-4 rounded transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
            }`}
          />

          <div className="flex justify-between text-sm mb-1">
            <label
              htmlFor="password"
              className={darkMode ? "text-gray-300" : "text-gray-600"}
            >
              Password
            </label>
            <Link
              to="#"
              className={`${
                darkMode ? "text-blue-400" : "text-blue-500"
              } hover:underline`}
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`w-full border px-4 py-2 mb-2 rounded transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
            }`}
          />

          {/* Keep Me Logged In */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="keep-logged"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
              className={`mr-2 ${darkMode ? "accent-blue-500" : ""}`}
            />
            <label
              htmlFor="keep-logged"
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Keep me logged in
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded mb-4 transition-colors duration-300 flex items-center justify-center ${
              darkMode
                ? "bg-emerald-700 hover:bg-emerald-600 text-white"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* ✅ Google Sign-In Button */}
        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            size="large"
            text="signin_with"
            shape="pill"
          />
        </div>

        {/* Sign Up Link */}
        <p
          className={`text-center text-sm mt-4 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className={`${
              darkMode
                ? "text-emerald-400 hover:text-emerald-300"
                : "text-emerald-600 hover:text-emerald-700"
            } hover:underline`}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
