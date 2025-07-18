import { useContext, useState } from "react";
import { ThemeContext } from '../context/ThemeContext';
import { InvoiceContext } from '../context/InvoiceContext';
import { useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import { useInvoiceContext } from '../context/InvoiceContext';
import {
  FaFacebookF, FaTwitter, FaEnvelope, FaLinkedinIn, FaTelegramPlane, FaWhatsapp,
  FaInstagram, FaRedditAlien, FaPinterestP, FaTumblr, FaSnapchatGhost, FaDiscord,
  FaYoutube, FaTiktok, FaMediumM, FaGithub, FaQuora, FaWeibo, FaLine, FaShareAlt,
} from 'react-icons/fa';
import { SiMessenger } from 'react-icons/si';

const ThankYouPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);
  const navigate = useNavigate();
  const [showIcons, setShowIcons] = useState(false);
const { resetInvoiceData } = useInvoiceContext();
  // Destructure safely with fallback
  const {
    from,
    billTo,
    shipTo,
    date,
    dueDate,
    paymentTerms,
    poNumber,
    currency: icurrency,
    amountPaid,
    lineItems: items,
    notes,
    terms,
    invoiceNumber,
    shipping: shippingAmount,
    labels: ilabels = {}
  } = invoiceData || {};

  
  const socialLinks = [
    { icon: <FaFacebookF />, url: "https://www.facebook.com/sharer.php?t=Invoice-Generator.com&u=https%3A%2F%2Finvoice-generator.com", label: "Facebook", color: "bg-blue-800" },
    { icon: <FaTwitter />, url: "https://twitter.com/intent/tweet?url=https%3A%2F%2Finvoice-generator.com&text=Invoice-Generator.com", label: "Twitter", color: "bg-black" },
    { icon: <FaEnvelope />, url: "https://mail.google.com/mail/u/0/#inbox", label: "Email", color: "bg-gray-400" },
    { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2FshareArticle%3Ftitle%3DInvoice-Generator.com%26url%3Dhttps%253A%252F%252Finvoice-generator.com", label: "LinkedIn", color: "bg-blue-700" },
    { icon: <SiMessenger />, url: "https://www.facebook.com/login.php?api_key=291494419107518&skip_api_login=1&display=page&cancel_url=https%3A%2F%2Fwww.sharethis.com&next=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fsend%3F_path%3Dsend...", label: "Messenger", color: "bg-blue-500" },
    { icon: <FaTelegramPlane />, url: "https://t.me/share/url?url=https%3A%2F%2Finvoice-generator.com", label: "Telegram", color: "bg-cyan-600" },
    { icon: <FaWhatsapp />, url: "https://api.whatsapp.com/send?text=https%3A%2F%2Finvoice-generator.com", label: "WhatsApp", color: "bg-green-600" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/", label: "Instagram", color: "bg-pink-500" },
    { icon: <FaRedditAlien />, url: "https://reddit.com/submit?url=https%3A%2F%2Finvoice-generator.com&title=Invoice-Generator.com", label: "Reddit", color: "bg-orange-600" },
    { icon: <FaPinterestP />, url: "https://pinterest.com/pin/create/button/?url=https%3A%2F%2Finvoice-generator.com", label: "Pinterest", color: "bg-red-500" },
    { icon: <FaTumblr />, url: "https://www.tumblr.com/widgets/share/tool?canonicalUrl=https%3A%2F%2Finvoice-generator.com", label: "Tumblr", color: "bg-blue-900" },
    { icon: <FaSnapchatGhost />, url: "https://www.snapchat.com", label: "Snapchat", color: "bg-yellow-400 text-black" },
    { icon: <FaDiscord />, url: "https://discord.com", label: "Discord", color: "bg-indigo-600" },
    { icon: <FaYoutube />, url: "https://www.youtube.com", label: "YouTube", color: "bg-red-600" },
    { icon: <FaTiktok />, url: "https://www.tiktok.com", label: "TikTok", color: "bg-black" },
    { icon: <FaMediumM />, url: "https://medium.com", label: "Medium", color: "bg-gray-800" },
    { icon: <FaGithub />, url: "https://github.com", label: "GitHub", color: "bg-gray-700" },
    { icon: <FaQuora />, url: "https://www.quora.com/", label: "Quora", color: "bg-red-700" },
    { icon: <FaWeibo />, url: "https://www.weibo.com", label: "Weibo", color: "bg-red-400" },
    { icon: <FaLine />, url: "https://social-plugins.line.me/lineit/share?url=https%3A%2F%2Finvoice-generator.com", label: "Line", color: "bg-green-500" },
  ];

  return (
    <div className={`min-h-screen px-6 py-10 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-6xl mx-auto space-y-8">
       <h1 className="text-2xl font-semibold">Thank you for invoicing with us!</h1>

        <div className="bg-green-500 text-white px-6 py-4 rounded shadow">
          <p>Your invoice has been generated! If the invoice did not open automatically, you can find it in your <strong>Downloads</strong> folder.</p>
        </div>

        <p className="text-sm flex items-start space-x-2 text-gray-500 dark:text-gray-400">
          <span className="text-lg">ℹ️</span>
          <span>
            A copy has also been saved to your device. You can return to the <strong>History</strong> page any time to make changes to your invoice.
            It is strongly recommended that you retain a copy of the generated PDF for your records.
          </span>
        </p>

        <div>
          <h3 className="font-semibold mb-2">What's next?</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Edit Invoice
            </button>

          <button 
  onClick={() => navigate('/history')}
  className="px-4 py-2 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
>
  Go to History
</button>


         <button
  onClick={() => {
    resetInvoiceData(); // Clear context
    navigate('/');        // Hard refresh to re-render everything
  }}
  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
>
  New Invoice
</button>

          </div>
        </div>

        
                <div>
                  <h3 className="font-semibold mb-2">Need more features?</h3>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    Create a free Invoice-Generator.com account to gain access to more features, like sending invoices, adding a Pay Invoice button, and accessing your invoices on any device.
                  </p>
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Sign Up
                  </button>
                </div>
        
                <div>
                  <h3 className="font-semibold mb-2">Love using Invoice Generator?</h3>
                  <p className="mb-2">Tell your friends!</p>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.slice(0, 5).map((social, i) => (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 text-white px-4 py-2 rounded shadow transition-transform duration-300 hover:-translate-y-1 ${social.color}`}
                      >
                        {social.icon} {social.label}
                      </a>
                    ))}
                    <button
                      onClick={() => setShowIcons(!showIcons)}
                      className="bg-lime-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:-translate-y-1 transition-transform duration-300"
                    >
                      <FaShareAlt /> Share
                    </button>
                  </div>
        
                  {showIcons && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center gap-2 text-white px-4 py-2 rounded shadow transition-transform duration-300 hover:-translate-y-1 ${social.color}`}
                        >
                          {social.icon}
                          <span className="hidden sm:inline">{social.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
        
                  <div className="mt-4">
                    <p className="mb-1">Or leave a review</p>
                    <a
                      href="https://www.trustpilot.com/review/invoice-generator.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 inline-block"
                    >
                      Review us on <span className="text-green-600 font-bold">★ Trustpilot</span>
                    </a>
                  </div>
                </div>
        
                <Footer />
      </div>
    </div>
  );
};

export default ThankYouPage;