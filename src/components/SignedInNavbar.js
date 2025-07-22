import React, { useContext, useState, useEffect } from 'react';
import logo from '../images/logo.png';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SignedInNavbar({ userName, email, onSignOut }) {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文 (Chinese)', flag: '🇨🇳' },
    { code: 'es', name: 'Español (Spanish)', flag: '🇪🇸' },
    { code: 'fr', name: 'Français (French)', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch (German)', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano (Italian)', flag: '🇮🇹' },
    { code: 'pt', name: 'Português (Portuguese)', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский (Russian)', flag: '🇷🇺' },
    { code: 'ja', name: '日本語 (Japanese)', flag: '🇯🇵' },
    { code: 'ko', name: '한국어 (Korean)', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية (Arabic)', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇧🇩' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
    { code: 'tr', name: 'Türkçe (Turkish)', flag: '🇹🇷' },
    { code: 'nl', name: 'Nederlands (Dutch)', flag: '🇳🇱' },
    { code: 'sv', name: 'Svenska (Swedish)', flag: '🇸🇪' },
    { code: 'fi', name: 'Suomi (Finnish)', flag: '🇫🇮' },
    { code: 'pl', name: 'Polski (Polish)', flag: '🇵🇱' },
    { code: 'uk', name: 'Українська (Ukrainian)', flag: '🇺🇦' },
    { code: 'ur', name: 'اردو (Urdu)', flag: '🇵🇰' },
  ];

  useEffect(() => {
    const storedLangCode = localStorage.getItem('language');
    const foundLang = languages.find((lang) => lang.code === storedLangCode);
    if (storedLangCode && foundLang) {
      setCurrentLanguage(foundLang.name);
      i18n.changeLanguage(storedLangCode);
    }
  }, [i18n.language]);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language.name);
    i18n.changeLanguage(language.code);
    localStorage.setItem('language', language.code);
    setShowLanguageDropdown(false);
  };

  return (
    <nav className={`border-b shadow-sm transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/signinHomepage')}>
          <img src={logo} alt="Logo" className="h-8" />
          <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {t('brand')}
          </span>
        </div>

        {/* Desktop Center Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <button
            type="button"
            onClick={() => window.location.href = '/my-invoices'}
            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}
          >
            {t('myInvoices')}
          </button>
          <button
            onClick={() => navigate('/upgrade')}
            className="px-4 py-1.5 rounded text-white bg-green-600 hover:bg-green-700"
          >
            {t('upgrade')}
          </button>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4 relative">
          {/* Language Selector */}
          <div className="relative">
            <button
              className={`text-lg ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              🅰️
            </button>
            {showLanguageDropdown && (
              <div className={`absolute right-0 mt-2 w-96 rounded-md shadow-lg py-1 z-50 ${darkMode ? 'bg-gray-700' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                <div className="grid grid-cols-3 gap-1 p-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className={`flex items-center px-3 py-2 text-sm rounded ${currentLanguage === language.name ? (darkMode ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900') : (darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100')}`}
                    >
                      <span className="mr-2 text-lg">{language.flag}</span>
                      {language.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            className={`text-xl ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}
            onClick={toggleTheme}
          >
            {darkMode ? '🌙' : '🌞'}
          </button>

          {/* User dropdown */}
          <button
            onClick={() => setShowUserDropdown(prev => !prev)}
            className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center space-x-1`}
          >
            <span className="hidden md:inline">{userName}</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showUserDropdown && (
            <div className={`absolute right-0 top-12 w-64 rounded-md shadow-lg z-50 ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className="p-4 border-b">
                <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userName}</div>
                <div className={`text-sm truncate ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{email}</div>
              </div>
              <div className="p-2">
                <button
                  className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}
                  onClick={() => navigate('/settings')}
                >
                  {t('myAccount')}
                </button>
                <button
                  className={`block w-full text-left px-4 py-2 text-sm text-red-500 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-red-100'}`}
                  onClick={() => {
                    localStorage.clear();
                    onSignOut();
                  }}
                >
                  {t('signOut')}
                </button>
              </div>
            </div>
          )}

          {/* Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden text-2xl ${darkMode ? 'text-white' : 'text-gray-800'}`}
          >
            {mobileMenuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-4 pb-4 space-y-3 border-t ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <button
            type="button"
            onClick={() => {
              window.location.href = '/my-invoices';
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2"
          >
            {t('myInvoices')}
          </button>
          <button
            onClick={() => {
              navigate('/upgrade');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {t('upgrade')}
          </button>
        </div>
      )}
    </nav>
  );
}
