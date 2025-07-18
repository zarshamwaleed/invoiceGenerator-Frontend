import React from "react";
import Footer from "./Footer";
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';
const PrivacyPolicy = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
     <div className={`flex flex-col min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-[#0e1d34]'}`}>
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 md:px-20 py-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-sm">Last Updated: March 8, 2024</p>

      <p className="mb-4">
        This Privacy Policy applies to the websites: invoice-generator.com (the “Sites”)
        owned and operated by Invoice-Generator.com (collectively, “Invoice Generator”, “we”, “us”, or “our”). This
        Privacy Policy describes how Invoice Generator collects, uses, shares and secures the personal information you
        provide, as well as the human resources data transferred to us for processing on behalf of our customers. It also
        describes your choices regarding use, access and correction of your personal information.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">Collection</h2>
      <p className="mb-4">We may collect the following personal information from you:</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Contact Information, such as name, email address, mailing address, or phone number;</li>
        <li>Demographic information, such as age, education, gender, interests and zip code;</li>
        <li>Billing Information, such as credit card number and billing address;</li>
        <li>Unique Identifiers, such as username, account number or password;</li>
        <li>Geo location based on IP address;</li>
        <li>Information about your business, such as company name, company size, business type.</li>
      </ul>
      <p className="mb-4">
        We may also collect, from you, personal information about your contacts such as name and email address where we
        can send receipts of your purchases. When you provide us with personal information about your contacts we will
        only use this information for the specific reason for which it is provided. If you believe that one of your
        contacts has provided us with your personal information and you would like to request that it be removed from our
        database, please contact us at the contact information below.
      </p>
      <p className="mb-4">
        As is true of most websites, we gather certain information automatically. This information may include Internet
        protocol (IP) addresses, browser type, Internet service provider (ISP), referring/exit pages, the files viewed on
        our site (e.g., HTML pages, graphics, etc.), operating system, date/time stamp, and/or clickstream data to analyze
        trends in the aggregate and administer the site.
      </p>
      <p className="mb-4">
        Invoice Generator and its partners use cookies or similar technologies to analyze trends, administer the website,
        track users’ movements around the website, and to gather demographic information about our user base as a whole.
        You can control the use of cookies at the individual browser level, but if you choose to disable cookies, it may
        limit your use of certain features or functions on our website or service.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">Use</h2>
      <p className="mb-4">
        The personal information as indicated being collected above is used for billing, identification, authentication,
        service improvement, research, and contact.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">Information Sharing</h2>
      <h3 className="text-lg font-semibold mb-2">1. With Third Parties:</h3>
      <p className="mb-4">
        We may share your information with third-party business partners, for instance, for the purpose of displaying
        advertisements or enhancing our products and services. If you do not want us to share your personal information
        with these companies, then please opt-out on the Cookie Consent screen.
      </p>
      <p className="mb-4">
        We use a third-party to provide monetization technologies for our site. You can review their privacy and cookie
        policy here.
      </p>

      <h3 className="text-lg font-semibold mb-2">2. With Service Providers:</h3>
      <p className="mb-4">
        We may share your information with third parties who provide services on our behalf to help with our business
        activities. These companies are authorized to use your personal information only as necessary to provide these
        services to us, to which these services may include:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Advertising</li>
        <li>Payment processing</li>
        <li>Providing customer service</li>
        <li>Sending marketing communications</li>
        <li>Conducting research and analysis</li>
        <li>Providing cloud computing infrastructure</li>
      </ul>

      <h3 className="text-lg font-semibold mb-2">3. With Public Authorities or Law Enforcement:</h3>
      <p className="mb-4">
        In certain situations, Invoice Generator may be required to disclose personal data in response to lawful requests
        by public authorities, including to meet national security or law enforcement requirements. We may also disclose
        your personal information as required by law, such as to comply with a subpoena or other legal process, when we
        believe in good faith that disclosure is necessary to protect our rights, when we believe there is a violation to
        our Terms of Service (see Invoice Generator Terms of Service), protect your safety or the safety of others,
        investigate fraud, or respond to a government request. If Invoice Generator is involved in a merger, acquisition,
        or sale of all or a portion of its assets, you will be notified via email and/or a prominent notice on our
        website, of any change in ownership, uses of your personal information, and choices you may have regarding your
        personal information. We do not sell, rent or share personal information with third parties without your prior
        consent.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">Security</h2>
      <p className="mb-4">
        The security of your personal information is important to us. We follow generally accepted standards to protect
        the personal information submitted to us, both during transmission and once it is received. Invoice Generator
        ensures that all customer billing and payment information, files and data remain private and confidential. Due to
        the sensitive nature of billing and payments we take this very seriously and make it our primary concern for all
        customers. We restrict access to personal information to Invoice Generator employees, contractors and agents who
        need to know that information in order to operate, develop, or improve our service. These individuals are bound by
        confidentiality obligations and may be subject to discipline, including termination and criminal prosecution, if
        they fail to meet these obligations.
      </p>
      <p className="mb-4">
        If you have any questions about the security of your personal information, you can contact us at the contact
        information below. We may retain your information for as long as your account is active or as needed to provide you
        services, comply with our legal obligations, resolve disputes and enforce our agreements.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">Access</h2>
      <p className="mb-4">
        Upon request Invoice Generator will provide you with information about whether we hold any of your personal
        information. You may access, correct, or request deletion of your personal information by logging into your
        account or by contacting us at the contact information below. We will respond to your request within a reasonable
        timeframe. In certain circumstances we may be required by law to retain your personal information, or may need to
        retain your personal information in order to continue providing a service.
      </p>
      <p className="mb-4">
        Invoice Generator acknowledges that you have the right to access your personal information. Invoice Generator has
        no direct relationship with the individuals whose personal data it processes. An individual who seeks access, or
        who seeks to correct, amend, or delete inaccurate data should direct their query to the Invoice Generator’s Client
        (the data controller). If requested to remove data we will respond within a reasonable timeframe. In certain
        circumstances we may be required by law to retain your personal information, or may need to retain your personal
        information in order to continue providing a service.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">Choice</h2>
      <p className="mb-4">
        We partner with a third party to manage our advertising on other sites. Our third party partner may use cookies or
        similar technologies in order to provide you advertising based upon your browsing activities and interests. If you
        wish to opt out of interest-based advertising click here (or if located in the European Union click here). Please
        note you will continue to receive generic ads.
      </p>
      <p className="mb-4">
        You can change your privacy settings by clicking the following button:
      </p>
      <p className="mb-4">
        You may sign-up to receive email or newsletter or other communications from us. If you would like to discontinue
        receiving this information, you may update your email preferences by using the “Unsubscribe” link found in emails
        we send to you or by contacting us at the contact information below.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">Changes to This Privacy Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy to reflect changes to our information practices. If we make any material
        changes we will notify you by email (sent to the e-mail address specified in your account) or by means of a notice
        on this website prior to the change becoming effective. We encourage you to periodically review this page for the
        latest information on our privacy practices.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">Privacy Questions / Feedback</h2>
      <p className="mb-4">
        If you have questions or concerns about Invoice Generator’s Privacy Policy please contact us at
        <a href="mailto:privacy@invoice-generator.com" className="text-green-600 hover:underline ml-1">
          privacy@invoice-generator.com
        </a>
        .
      </p>
      <Footer/>
    </div>
    </div>
  );
};

export default PrivacyPolicy;
