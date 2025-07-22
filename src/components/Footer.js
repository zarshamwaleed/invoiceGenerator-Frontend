import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaGlobe,
} from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate, Link } from "react-router-dom";

export default function Footer() {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavWithRefresh = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      window.location.reload();
    }, 700); // delay for spinner
  };

  return (
    <footer
      className={`relative border-t mt-10 py-10 text-sm transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 border-gray-700 text-gray-300"
          : "bg-gray-100 border-gray-200 text-gray-700"
      }`}
    >
      {/* Spinner Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div>
          <h4
            className={`font-semibold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            USE INVOICE GENERATOR
          </h4>
          <ul className="space-y-1">
            {[
              { label: "Invoice Template", path: "/" },
              { label: "Credit Note Template", path: "/credit-note-template" },
              { label: "Quote Template", path: "/quote-template" },
              { label: "Purchase Order Template", path: "/purchase-order-template" },
            ].map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavWithRefresh(link.path)}
                  className={`transition-colors duration-200 hover:text-green-500 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Middle Column */}
        <div>
          <h4
            className={`font-semibold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            RESOURCES
          </h4>
          <ul className="space-y-1">
            <li>
              <Link
                to="/guide"
                className="hover:text-green-600 transition-colors duration-200"
              >
                Invoicing Guide
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                className="hover:text-green-600 transition-colors duration-200"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="hover:text-green-600 transition-colors duration-200"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="hover:text-green-600 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/release-notes"
                className="hover:text-green-600 transition-colors duration-200"
              >
                Release Notes
              </Link>
            </li>
            <li>
              <Link
                to="/apidoc"
                className="hover:text-green-600 transition-colors duration-200"
              >
                Developer API
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-2">
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            © 2012–2025 Invoice-Generator.com
          </p>
          <br />
          <div
            className={`flex space-x-3 text-xl ${
              darkMode ? "text-gray-300" : "text-black"
            }`}
          >
            <a
              href="https://www.facebook.com/invgenerator"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/InvGenerator"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.youtube.com/@InvGenerator"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 transition-colors"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.linkedin.com/company/invoice-generator-com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 transition-colors"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/Invoice-Generator/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 transition-colors"
            >
              <FaGlobe />
            </a>
          </div>

          <div className="space-y-1">
            <Link
              to="/terms-of-service"
              className={`hover:text-green-600 hover:underline cursor-pointer ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              <br />
              Terms of Service <br />
            </Link>
            <Link
              to="/privacy-policy"
              className={`hover:text-green-600 hover:underline cursor-pointer ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
