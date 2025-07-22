import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { ThemeContext } from "../context/ThemeContext";

// ✅ ADDED: i18n import
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");

  // ✅ ADDED: useTranslation hook
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "zh", name: "中文 (Chinese)", flag: "🇨🇳" },
    { code: "es", name: "Español (Spanish)", flag: "🇪🇸" },
    { code: "fr", name: "Français (French)", flag: "🇫🇷" },
    { code: "de", name: "Deutsch (German)", flag: "🇩🇪" },
    { code: "it", name: "Italiano (Italian)", flag: "🇮🇹" },
    { code: "pt", name: "Português (Portuguese)", flag: "🇵🇹" },
    { code: "ru", name: "Русский (Russian)", flag: "🇷🇺" },
    { code: "ja", name: "日本語 (Japanese)", flag: "🇯🇵" },
    { code: "ko", name: "한국어 (Korean)", flag: "🇰🇷" },
    { code: "ar", name: "العربية (Arabic)", flag: "🇸🇦" },
    { code: "hi", name: "हिन्दी (Hindi)", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা (Bengali)", flag: "🇧🇩" },
    { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)", flag: "🇮🇳" },
    { code: "tr", name: "Türkçe (Turkish)", flag: "🇹🇷" },
    { code: "nl", name: "Nederlands (Dutch)", flag: "🇳🇱" },
    { code: "sv", name: "Svenska (Swedish)", flag: "🇸🇪" },
    { code: "fi", name: "Suomi (Finnish)", flag: "🇫🇮" },
    { code: "pl", name: "Polski (Polish)", flag: "🇵🇱" },
    { code: "uk", name: "Українська (Ukrainian)", flag: "🇺🇦" },
    { code: "ur", name: "اردو (Urdu)", flag: "🇵🇰" }
  ];

  // ✅ UPDATED: Use i18n.changeLanguage for global language change
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language.code);
    setCurrentLanguage(language.name);
    setShowLanguageDropdown(false);
  };

  return (
    <nav className={`border-b shadow-sm transition-colors duration-300 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="h-8" />
          <span className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
            {/* ✅ REPLACED: getTranslation("brand") with t("brand") */}
            {t("brand")}
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm">
          <Link to="/help" className={`hover:underline ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"}`}>
            {/* ✅ REPLACED: getTranslation("help") */}
            {t("help")}
          </Link>
          <Link to="/history" className={`hover:underline ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"}`}>
            {/* ✅ REPLACED: getTranslation("history") */}
            {t("history")}
          </Link>
          <Link to="/guide" className={`hover:underline ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"}`}>
            {/* ✅ REPLACED: getTranslation("guide") */}
            {t("guide")}
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative">
            <button onClick={() => setShowLanguageDropdown(!showLanguageDropdown)} className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              🅰️
            </button>
            {showLanguageDropdown && (
              <div className={`absolute right-0 mt-2 w-96 z-50 rounded-md shadow-lg py-2 ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                <div className="grid grid-cols-3 gap-1 p-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className={`flex items-center px-3 py-2 text-sm rounded ${
                        currentLanguage === language.name
                          ? darkMode ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-900"
                          : darkMode ? "text-gray-300 hover:bg-gray-600" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-2 text-lg">{language.flag}</span>
                      {language.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme} className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {darkMode ? "🌙" : "🌞"}
          </button>

          {/* Sign In / Sign Up (Desktop) */}
          <Link to="/signin" className={`hidden md:inline text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {/* ✅ REPLACED: getTranslation("signIn") */}
            {t("signIn")}
          </Link>
          <Link to="/signup" className="hidden md:inline">
            <button className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded">
              {/* ✅ REPLACED: getTranslation("signUp") */}
              {t("signUp")}
            </button>
          </Link>

          {/* Hamburger Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden text-2xl transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-800"}`}
          >
            {mobileMenuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-4 pb-4 space-y-3 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} border-t`}>
          <Link to="/help" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b">{t("help")}</Link>
          <Link to="/history" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b">{t("history")}</Link>
          <Link to="/guide" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b">{t("guide")}</Link>
          <Link to="/signin" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b">{t("signIn")}</Link>
          <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
            <button className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">{t("signUp")}</button>
          </Link>
        </div>
      )}
    </nav>
  );
}
