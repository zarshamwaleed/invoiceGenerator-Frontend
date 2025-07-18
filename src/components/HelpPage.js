import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function HelpPage() {
    const { darkMode } = useContext(ThemeContext);
      const navigate = useNavigate();
    return (
        <div className={`flex flex-col min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-[#0e1d34]'}`}>
            <div className="px-6 md:px-20 lg:px-40 py-8 flex-grow">
                {/* Header */}
                <div className="mb-8">
                    <h1 className={`text-xl font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#0e1d34]'}`}>
                        <Link
                            to="/"
                            className={`text-lg px-2 py-1 rounded transition-colors duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            title="Go to Home"
                        >
                            ←
                        </Link>
                        Help
                    </h1>
                    <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Invoice Generator provides an invoice template that lets you make professional invoices in one-click.
                        Generated invoices can be sent and paid online.
                    </p>
                </div>

                {/* Section 1 */}
                <section className="mb-8">
                    <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#0e1d34]'}`}>Why use Invoice Generator?</h2>
                    <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <p><strong>1. Instant Invoices</strong><br />We have developed the fastest way to make an invoice using our invoice template...</p>
            <p><strong>2. Invoice from any device</strong><br />Invoice on-the-go from any device, desktop, tablet, or smartphone.</p>
            <p><strong>3. Trusted by millions</strong><br />Every month millions of invoices are generated on Invoice Generator.</p>
            <p><strong>4. 100% FREE</strong><br />There are no limits. Use it as much as you like.</p>
            <p>Our objective at Invoice-Generator.com is to make invoicing as simple as possible...</p>
                    </div>
                </section>

                {/* Section 2 */}
                <section>
                    <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#0e1d34]'}`}>How do I use Invoice Generator?</h2>

                    <div className="mb-6">
                        <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Making Invoices</h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Generating invoices is easy! Fill out the invoice template with all the details you want on your invoice.
                        </p>
                        <div className="flex items-start gap-1 mt-2">
                            <Info className={`w-4 h-4 mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                The download invoice button will be disabled until you fill in your information...
                            </span>
                        </div>
                    </div>
 <div className="mb-6">
            <h3 className="font-semibold">Sending Invoices</h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
             Invoices can be sent to customers with an Invoice-Generator.com account. Your invoices are stored securely in the cloud, and you can accept a variety of payment methods that are convenient for your customer.
            </p>
               <button
      className="mt-2 px-4 py-1 bg-[#00a877] text-white rounded"
      onClick={() => navigate('/signup')}
    >
      Learn More
    </button>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold">Payments</h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
         If you are using the send invoice feature, you can accept bank account and credit/debit card payments from your buyer. You are also able to add payment instructions to your invoice if you want to accept alternative payment methods.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold">Downloading Invoices</h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Click the <strong> Download Invoice</strong> to download a PDF of your invoice. If you made a mistake, don't worry, you can go back and update the invoice by clicking <strong>Edit this invoice</strong> . If you do not see your invoice once you click download then you should check your Downloads folder.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold">Saving Invoices</h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Invoices that you download or send are auto-saved to your device's local storage. This allows you to go back and edit past invoices. <br /><br />

You can access past invoices on the History page. Click on a previously generated invoice to open it in the invoice editor. You can also export all of your invoices to a spreadsheet file by clicking the <strong>Export</strong>  button.
<br /><br />
Individual invoices can be deleted by hovering over the invoice and clicking the <strong>X</strong>  button. Clicking <strong>Erase Everything</strong>  will erase all saved invoices and any customizations to the invoice template.
            </p>
          </div>

          {/* ✅ New Added Section */}
          <div className="mt-10">
            <h3 className="font-semibold mb-2">Customizing the Invoice Template</h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              If you find yourself using Invoice Generator often, you can memorize your invoice template customizations. Just click
              <strong> Save Template</strong> in the right sidebar after you have finished customizing your invoice template. Now every time you use Invoice Generator your personalized invoice template will be loaded.
<br /><br />
The invoice template will remember your:
            </p>
            <ol  className={` list-disc list-inside text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>From Address</li>
              <li>Logo</li>
              <li>Currency</li>
              <li>Terms</li>
              <li>Notes</li>
              <li>Field Titles</li>
            </ol>

            <h3 className="font-semibold mt-6 mb-2">System Requirements</h3>
            <p  className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              In order to use Invoice Generator you must use one of the following web browsers:
            </p>
        <ul className={`list-disc pl-5 text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}> <br />
  <li>Google Chrome: latest two versions</li>
  <li>Mozilla Firefox: latest two versions</li>
  <li>Apple Safari: latest two versions</li>
  <li>Microsoft Edge: latest two versions</li>
  <li>Internet Explorer 11</li> <br />
</ul>

<p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
  Your browser must also have:
</p>

<ul className={`list-disc pl-5 text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}> <br />
  <li>Javascript enabled</li>
  <li>Local storage enabled</li>
  <li>TLS v1.2 or above</li>
</ul>

          </div>

          {/* Store Invoices Section */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">Where does Invoice Generator store invoices?</h2>

            <h3 className="font-semibold">Send Invoice feature</h3>
<p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
  If you have used the Send Invoice option then you or your recipient can retrieve the invoice at any time by
  <Link
    to="/signin"
    className="text-[#00a877] hover:underline"
  >
    {' '}signing in to Invoice-Generator.com
  </Link>.
</p>

            <h3 className="font-semibold mt-4">Download Invoice feature</h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Invoice Generator uses your web browser’s local storage to remember your invoices...
              they cannot be recovered.
            </p>
          </div>

          {/* What's new */}

                    <div className="mt-10">
                        <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>What's new?</h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Read the <Link to="/release-notes" className={`hover:underline ${darkMode ? 'text-blue-400' : 'text-[#00a877]'}`}>Release Notes</Link> to see the latest invoicing features we've added.
                        </p>
                    </div>

                     <div className="mt-10">
                        <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Invoice Generator API</h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Save yourself the hassle of setting up an invoice template and all of the frustration associated with generating PDFs. Our service gives you a clean interface for quick, attractive invoices generated from your code.
            </p>
                    </div>
          <button
      className="mt-2 px-4 py-1 bg-[#00a877] text-white rounded"
      onClick={() => navigate("/apidoc")}
    >
      API Documentation
    </button>
                </section>
            </div>

            <Footer />
        </div>
    );
}