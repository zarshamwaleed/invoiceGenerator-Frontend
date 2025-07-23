import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function HelpPage() {
    const { darkMode } = useContext(ThemeContext);
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className={`flex flex-col min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-[#0e1d34]'}`}>
            <div className="px-6 md:px-20 lg:px-40 py-8 flex-grow">

                {/* Header */}
                <div className="mb-8">
                    <h1 className={`text-xl font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#0e1d34]'}`}>
                        <Link
                            to="/"
                            className={`text-lg px-2 py-1 rounded transition-colors duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title={t("Go to Home")}
                        >
                            ←
                        </Link>
                        {t("Help")}
                    </h1>
                    <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {t("HelpPageIntro")}
                    </p>
                </div>

                {/* Section 1 */}
                <section className="mb-8">
                    <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#0e1d34]'}`}>{t("Why use Invoice Generator?")}</h2>
                    <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <p><strong>{t("Instant Invoices")}</strong><br />{t("Instant Invoices Desc")}</p>
                        <p><strong>{t("Invoice from any device")}</strong><br />{t("Invoice from any device Desc")}</p>
                        <p><strong>{t("Trusted by millions")}</strong><br />{t("Trusted by millions Desc")}</p>
                        <p><strong>{t("100% FREE")}</strong><br />{t("100% FREE Desc")}</p>
                        <p>{t("Why use Invoice Generator Desc")}</p>
                    </div>
                </section>

                {/* Section 2 */}
                <section>
                    <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#0e1d34]'}`}>{t("How do I use Invoice Generator?")}</h2>

                    <div className="mb-6">
                        <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{t("Making Invoices")}</h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t("Making Invoices Desc")}</p>
                        <div className="flex items-start gap-1 mt-2">
                            <Info className={`w-4 h-4 mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t("Download Disabled Info")}</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold">{t("Sending Invoices")}</h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t("Sending Invoices Desc")}</p>
                        <button className="mt-2 px-4 py-1 bg-[#00a877] text-white rounded" onClick={() => navigate('/signup')}>
                            {t("Learn More")}
                        </button>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold">{t("Payments")}</h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t("Payments Desc")}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold">{t("Downloading Invoices")}</h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t("Downloading Invoices Desc")}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold">{t("Saving Invoices")}</h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t("Saving Invoices Desc")}</p>
                    </div>

                    {/* Customizing Section */}
                    <div className="mt-10">
                        <h3 className="font-semibold mb-2">{t("Customizing the Invoice Template")}</h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t("Customizing Desc")}</p>
                        <ol className={`list-disc list-inside text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <li>{t("From Address")}</li>
                            <li>{t("Logo")}</li>
                            <li>{t("Currency")}</li>
                            <li>{t("Terms")}</li>
                            <li>{t("Notes")}</li>
                            <li>{t("Field Titles")}</li>
                        </ol>

                        <h3 className="font-semibold mt-6 mb-2">{t("System Requirements")}</h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t("Browser Requirement")}</p>
                        <ul className={`list-disc pl-5 text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <br />
                            <li>{t("Google Chrome: latest two versions")}</li>
                            <li>{t("Mozilla Firefox: latest two versions")}</li>
                            <li>{t("Apple Safari: latest two versions")}</li>
                            <li>{t("Microsoft Edge: latest two versions")}</li>
                            <li>{t("Internet Explorer 11")}</li>
                        </ul>

                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t("Browser Settings")}</p>
                        <ul className={`list-disc pl-5 text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <br />
                            <li>{t("Javascript enabled")}</li>
                            <li>{t("Local storage enabled")}</li>
                            <li>{t("TLS v1.2 or above")}</li>
                        </ul>
                    </div>

                    {/* Storage Section */}
                    <div className="mt-10">
                        <h2 className="text-lg font-semibold mb-4">{t("Where does Invoice Generator store invoices?")}</h2>
                        <h3 className="font-semibold">{t("Send Invoice feature")}</h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {t("Send Invoice Desc")}{' '}
                            <Link to="/signin" className="text-[#00a877] hover:underline">{t("signing in to Invoice-Generator.com")}</Link>.
                        </p>
                        <h3 className="font-semibold mt-4">{t("Download Invoice feature")}</h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t("Download Invoice Desc")}</p>
                    </div>

                    {/* What's New */}
                    <div className="mt-10">
                        <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{t("What's new?")}</h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {t("Read the")}{' '}
                            <Link to="/release-notes" className={`hover:underline ${darkMode ? 'text-blue-400' : 'text-[#00a877]'}`}>{t("Release Notes")}</Link>{' '}
                            {t("to see the latest invoicing features we've added.")}.
                        </p>
                    </div>

                    <div className="mt-10">
                        <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{t("Invoice Generator API")}</h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t("API Desc")}</p>
                        <button className="mt-2 px-4 py-1 bg-[#00a877] text-white rounded" onClick={() => navigate("/apidoc")}>
                            {t("API Documentation")}
                        </button>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}
