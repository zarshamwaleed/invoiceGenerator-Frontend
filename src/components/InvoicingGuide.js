import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import invoiceGuide from "../images/invoiceGuide.jpg";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function InvoicingGuide() {
    const { darkMode } = useContext(ThemeContext);
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
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#0e1d34]'}`}>Invoicing Guide</h2>
                <h3 className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Introduction to the Essential Invoicing Guide for Freelancers and Small Business Owners
                </h3>

                <p className="mb-4">
                    Welcome to our comprehensive guide, designed to demystify the invoicing and accounting processes for freelancers
                    and small business owners. Mastering these crucial skills is essential for ensuring that your business runs
                    smoothly, payments are received on time, and your financial health is maintained.
                </p>

                <p className="mb-4">
                    Proper invoicing and accounting not only secure your cash flow but also offer insights into your business
                    operations, allowing for informed decision-making and strategic planning.
                </p>

                <p className="mb-4">
                    To support you in this critical aspect of your business, we introduce our website's free invoice generator tool.
                    This intuitive tool simplifies the creation of professional-looking invoices, enabling you to customize and send
                    invoices with ease, track payments, and manage your finances efficiently.
                </p>

                <p className="mb-4">
                    Whether you're billing for the first time or looking to streamline your existing process, our free invoice template
                    is designed to save you time and reduce the administrative burden of managing your finances.
                </p>

                <p>
                    Let's embark on this journey to financial organization and success together, starting with the basics and moving
                    towards mastering effective invoicing and foundational accounting principles.
                </p>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}