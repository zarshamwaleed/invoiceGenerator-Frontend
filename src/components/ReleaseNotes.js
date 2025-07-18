import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const notes = [
    { date: "June 5, 2024", text: "It's now possible to change the next invoice number when signed in." },
     { date: "June 2, 2024", text: "Several new languages have been added to Invoice-Generator.com bringing the total number of supported languages to 16." },
     { date: "May 27, 2024", text: "Introducing Cloud Mode! When signed in with your free Invoice-Generator.com account your invoices will be stored securely in the cloud and synced seamlessly across all of your devices." },
     { date: "April 23, 2024", text: "Added a purchase order template." },
     { date: "April 5, 2024", text: "Invoice Generator has new branding! In order to celebrate our new logo we have also added a Dark Mode." },
     { date: "March 8, 2024", text: "The invoice History page has a new design that shows more information about invoices. A quote template and credit note template has been added." },
     { date: "March 7, 2022", text: "Updated the invoice template currency list to use the latest ISO currencies." },
     { date: "September 13, 2021", text: "You can add any payment link to your invoices when using the Send Invoice option." },
     { date: "September 1, 2021", text: "The invoice template includes an optional PO number field for referencing a purchase order from your buyer." },
     { date: "August 25, 2021", text: "Need to send an e-invoice? You can now generate Universal Business Language (UBL) invoices for use in e-invoicing." },
     { date: "May 17, 2020", text: "An optional Ship To field was added to the invoice template." },
     { date: "May 17, 2020", text: "Invoice Generator is now available in French, German, and Spanish." },
     { date: "May 16, 2020", text: "Improve formatting of money amounts across various currencies. Money amounts will now be rendered specific to your browser's locale." },
     { date: "July 30, 2018", text: "Cleaned up various bugs around the application. Invoice Generator is now used by millions of people around the world. Thank you for your support!" },
     { date: "March 5, 2018", text: "Money amounts are now formatted more consistently on the rendered invoice PDF." },
     { date: "November 30, 2017", text: "The invoice email template has been improved. Also, sending invoices from Invoice Generator now includes more information about the sender in the email footer." },
    {
     date: "December 22, 2016",
     text: (
       <>
         Read our new <Link to="/guide" className="text-[#00a877]">Invoicing Guide</Link> to learn how to invoice like a boss and get paid.
       </>
     )
   }
   ,
   
     { date: "September 12, 2016", text: "Added a 'Payment Terms' field." },
     { date: "November 25, 2015", text: "New payment options! You can now get paid online with Venmo and Square Cash. Previously we only supported PayPal." },
     { date: "October 23, 2015", text: "The invoice template UI has been refreshed. The interface has been cleaned up, allowing you to get invoices out the door faster." },
     { date: "August 28, 2015", text: "We now send you an alert if an invoice email we delivered bounces several hours later." },
     { date: "July 13, 2015", text: "Invoice numbers are now automatically generated for you. Each new invoice you create will increment the invoice number by one. Custom invoice numbers are still supported also." },
     { date: "June 27, 2015", text: "Invoices can now be exported to a CSV (comma-separated values) file by going to History and clicking the Export to CSV button." },
     { date: "February 13, 2015", text: "The Invoice Generator API has been launched. You can learn more about it on GitHub." },
     { date: "February 6, 2015", text: "Sending invoices just got better. The send invoice form has been simplified..." },
     { date: "February 5, 2015", text: "A brand new invoice template is here! Invoicing has gotten even better..." },
     { date: "November 14, 2014", text: "Fancy decimals! The invoice template has crisper decimal formatting." },
     { date: "November 10, 2014", text: "Improved the invoice template. Smoothed out some issues on the interface and cleaned up the UI for a quicker invoicing experience." },
     { date: "September 8, 2014", text: "The site is now secured with SSL by default..." },
     { date: "August 29, 2014", text: "You can now invoice in Bitcoin! Invoice Generator has several new currencies..." },
     { date: "May 7, 2014", text: "Invoices have a new and improved template and invoices sent via email are delivered more reliably." },
     { date: "March 20, 2014", text: "New features: discount and shipping lines..." },
     { date: "March 10, 2014", text: "Invoice Generator is now mobile! The site has a fresh look that works on any device..." },
     { date: "January 18, 2014", text: "Switched invoice PDF generation library from dompdf to wkhtmltopdf for a massive speed increase and smaller file sizes." },
     { date: "January 15, 2014", text: "Labeled 'From' and 'Client' invoice fields with labels. Fixed bug causing tall logos to not be sized properly..." },
     { date: "December 3, 2013", text: "Improved error messages for improper logos and sped up page load time." },
     { date: "September 25, 2013", text: "Corrected a bug that caused some currency symbols to render improperly." },
     { date: "July 31, 2013", text: "Fixed a bug where the resulting PDF came out as jumbled text..." },
     { date: "July 28, 2013", text: "Longer running notes now wrap to a new page. The 'To' and 'From' fields are now left aligned..." },
     { date: "July 25, 2013", text: "Limited logo file size to 1MB..." },
     { date: "July 16, 2013", text: "Cleaned up UI and added Venezuelan Bolivars to currencies." },
     { date: "June 19, 2013", text: "Emails are now beautiful too! Improved email template and sped up send times." },
     { date: "May 10, 2013", text: "Fixed various bugs. Thank you for everyone who reported problems." },
     { date: "May 7, 2013", text: "Invoice Generator now supports the international date format (d/m/y)." },
     { date: "May 1, 2013", text: "Fixed bug that caused 'Amount Paid' to incorrectly round up." },
     { date: "April 30, 2013", text: "Generated invoice PDFs now support Unicode. New button to remove invoice logos." },
     { date: "April 26, 2013", text: "Invoices are now saved to local storage..." },
     { date: "March 24, 2013", text: "Improved invoice template. Now it is possible to email invoices as PDF attachments from the site." },
     { date: "January 15, 2013", text: "Invoice Generator has been completely redesigned..." },
     { date: "June 6, 2012", text: "Launch!" }
];

export default function ReleaseNotes() {
    const { darkMode } = useContext(ThemeContext);
    return (
        <div className={`flex flex-col min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-[#0e1d34]'}`}>
            <div className="px-6 md:px-20 lg:px-40 py-10 flex-grow">
                <h1 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#0e1d34]'}`}>Release Notes</h1>
                <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Read about the latest changes and improvements to help you send invoices faster.
                </p>

                <div className="space-y-6">
                    {notes.map((note, index) => (
                        <div key={index}>
                            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{note.date}</p>
                            <p className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-black'}`}>
                                {note.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}