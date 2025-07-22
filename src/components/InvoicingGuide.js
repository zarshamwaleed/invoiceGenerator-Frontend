import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import invoiceGuide from "../images/invoiceGuide.jpg";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
export default function InvoicingGuide() {
    const { darkMode } = useContext(ThemeContext);
    const { t } = useTranslation();
    return (
        <div className={`min-h-screen  transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-[#0e1d34]'}`}>
            {/* Banner Section */}
            {/* <div className={`flex flex-col md:flex-row items-center px-6 md:px-20 py-10 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-[#253046]'} text-white`}> */}
   <div className="px-6 md:px-20 py-10 max-w-4xl mx-auto">
  <img
    src={invoiceGuide}
    alt="Invoicing Illustration"
    className="w-full h-auto"
  />
</div>

            {/* </div> */}

            {/* Guide Content */}
            <div className={`px-6 md:px-20 py-10 max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#0e1d34]'}`}>          {t("GuideTitle")}
        </h2>

                <h3 className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                   {t("GuideIntro")}
        </h3>

                <p className="mb-4">
                   {t("GuidePara1")}
        </p>

                <p className="mb-4">
                  {t("GuidePara2")}
        </p>
                <p className="mb-4">
                      {t("GuidePara3")}
        </p>

                <p className="mb-4">
                  {t("GuidePara4")}
        </p>

                <p>
                 {t("GuidePara5")}
        </p>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}