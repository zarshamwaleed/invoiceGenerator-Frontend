import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FiEdit3 } from 'react-icons/fi';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
export default function Settings() {
  const { darkMode } = useContext(ThemeContext);
const navigate = useNavigate();
  return (
    <div className={`min-h-[100vh] px-8 py-10 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`rounded-lg shadow p-8 w-full transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-center mb-2">Settings</h1>
        <p className={`text-center mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Manage your settings here, including how you want to get paid.
        </p>

        {/* Invoicing Settings */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-1">Invoicing Settings</h2>
          <p className="flex items-center gap-1">
            Next Invoice Number: <span className="font-semibold text-green-600">17</span>
            <FiEdit3 className="text-green-600 cursor-pointer" />
          </p>
        </div>

        {/* Payment Settings */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-2">Payment Settings</h2>
          <div className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-700 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            Action Required
          </div>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            You need to finish setting up your Stripe account in order to process payments.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded">
            Complete onboarding
          </button>
        </div>

        {/* Developer Settings Button */}
      <div className="border-t pt-6 flex justify-center">
    <button
      onClick={() => navigate('/developer-settings')}
      className="flex items-center gap-2 px-4 py-2 rounded bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-sm"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
      Developer Settings
    </button>
  </div>
        <Footer/>
      </div>
    </div>
  );
}
